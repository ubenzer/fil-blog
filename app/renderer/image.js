import {
  fromGeneratedImagePath, idForPostAttachment, idToPath, isPathImage, postIdToImageId,
  urlToPath
} from '../utils/id'
import {isExternalUrl, isVimeo, isYoutube, urlForPostAttachment, vimeoUrlToId, youtubeUrlToId} from '../utils/url'
import mime from 'mime-types'
import path from 'path'

const LOW_RES_SIZE = 50
const DEFAULT_IMAGE_SIZE = 665
const SMALL_IMAGE_SIZE = 200

const calculateCaption = ({rawCaption}) => {
  const captionPairs = rawCaption.split('|')
  return captionPairs.pop()
}

const calculateRenderAsLink = ({rawCaption}) => {
  const captionPairs = rawCaption.split('|')
  return captionPairs.indexOf('nolink') === -1
}

const calculateClasses = ({rawCaption}) => {
  const captionPairs = rawCaption.split('|')
  captionPairs.pop()
  const classes = []
  if (captionPairs.indexOf('right') > -1) {
    classes.push('right')
    classes.push('small')
  } else if (captionPairs.indexOf('left') > -1) {
    classes.push('left')
    classes.push('small')
  } else {
    classes.push('center')
    classes.push('big')
  }
  return classes
}

const availableSizesFor = ({id, imageMetas: allImageMetas, scaledImageIds: allScaledImages}) => {
  const image = allImageMetas.filter((i) => i.id === id)[0]
  if (!image) { return [] }

  const imagePath = idToPath({id})

  const scaledImages = allScaledImages.reduce((acc, i) => {
    const p = idToPath({id: i})
    const ext = path.extname(p).substr(1)
    const {dimension, originalPath} = fromGeneratedImagePath({p})
    if (originalPath === imagePath) {
      return [...acc, {ext, id: i, width: dimension}]
    }
    return acc
  }, [])

  return [...scaledImages, {
    ext: path.extname(idToPath({id: image.id})).substr(1),
    id: image.id,
    width: image.meta.width
  }]
}

const calculateSrcsetString = ({availableSizes}) => {
  const mimeImages = availableSizes.map((as) => {
    const url = urlForPostAttachment({id: as.id})
    return `${url} ${as.width}w`
  })

  return mimeImages.join(', ')
}

const getImageByMaxWidth = ({availableSizes, maxWidth, mime: originalMime}) => {
  const sortedImages = availableSizes
    .filter((as) => mime.lookup(as.ext) === originalMime)
    .sort((a, b) => a.width - b.width)

  let bestCandidate = sortedImages[0]

  sortedImages.forEach((si) => {
    if (si.width > bestCandidate.width && si.width < maxWidth) {
      bestCandidate = si
    }
  })

  return bestCandidate
}

const imgTag = ({caption, classes, height, width, srcSet, src, lowresSrc}) =>
  `<span class="img fade-box ${classes.join(' ')}">
    <img class="fade-box__lores" src="${lowresSrc}" alt="${caption}" width="${width}" height="${height}">
    <img class="lazyload fade-box__hires" data-src="${src}" title="${caption}" alt="${caption}"\
width="${width}" height="${height}" data-srcset="${srcSet}">
    <span style="padding-top: ${height / width * 100}%" class="fade-box__aspect_ratio_el">&nbsp;</span>
  </span>
`
const simpleImgTag = ({caption, classes, src}) =>
  `<img src="${src}" title="${caption}" alt="${caption}"${classes.length > 0 ? ` class="${classes.join(' ')}"` : ''}>`

const aTag = ({innerHtml, url}) =>
  `<a href="${url}" target="_blank">${innerHtml}</a>`

const renderAsImgWithSrcset = ({availableSizes, caption, classes, imageMeta, renderAsLink, url}) => {
  const allClasses = [...classes]
  const imageMime = mime.lookup(path.extname(url).substr(1))
  const fallbackImageUrl = urlForPostAttachment({
    id: getImageByMaxWidth({
      availableSizes,
      maxWidth: allClasses.indexOf('small') > -1 ? SMALL_IMAGE_SIZE : DEFAULT_IMAGE_SIZE,
      mime: imageMime
    }).id
  })
  const lowResImageUrl = urlForPostAttachment({
    id: getImageByMaxWidth({
      availableSizes,
      maxWidth: LOW_RES_SIZE,
      mime: imageMime
    }).id
  })

  const srcSet = calculateSrcsetString({availableSizes})
  const img = imgTag({
    caption,
    classes: allClasses,
    height: imageMeta.height,
    lowresSrc: lowResImageUrl,
    src: fallbackImageUrl,
    srcSet,
    width: imageMeta.width
  })

  if (renderAsLink) {
    return aTag({innerHtml: img, url})
  }
  return img
}

const renderAsYoutube = ({classes, url}) => {
  const videoId = youtubeUrlToId({url})
  const allClasses = ['youtube', 'video', ...classes]

  return (
    `<div class="${allClasses.join(' ')}">
       <iframe type="text/html" data-src="https://www.youtube.com/embed/${videoId}?modestbranding=1&amp;\
showinfo=0&amp;rel=0" frameborder="0" allowfullscreen class="lazyload"></iframe>
     </div>
    `
  )
}

const renderAsVimeo = ({classes, url}) => {
  const videoId = vimeoUrlToId({url})
  const allClasses = ['vimeo', 'video', ...classes]

  return (
    `<div class="${allClasses.join(' ')}">
      <iframe data-src="https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0" frameborder="0" 
      allowfullscreen frameborder="0" class="lazyload"></iframe>
     </div>
    `
  )
}

const renderAsImg = ({caption, classes, renderAsLink, url}) => {
  if (isYoutube({url})) {
    return renderAsYoutube({classes, url})
  } else if (isVimeo({url})) {
    return renderAsVimeo({classes, url})
  }
  const normalizedClasses = ['img', ...classes]
  const img = simpleImgTag({caption, classes: normalizedClasses, src: url})
  if (renderAsLink) {
    return aTag({innerHtml: img, url})
  }
  return img
}

export const markdownImageParser = (md, {imageMetas, postId, scaledImageIds}) => {
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx]
    const srcIndex = token.attrIndex('src')

    const rawUrl = token.attrs[srcIndex][1]
    const rawCaption = token.content

    const caption = calculateCaption({rawCaption})
    const classes = calculateClasses({rawCaption})
    const renderAsLink = calculateRenderAsLink({rawCaption})

    if (isExternalUrl({url: rawUrl})) {
      return renderAsImg({caption, classes, renderAsLink, url: rawUrl})
    }

    const imageId = postIdToImageId({imageRelativeUrl: rawUrl, postId})
    const url = urlForPostAttachment({id: imageId})
    if (!isPathImage({p: urlToPath({url})})) {
      // gifs and svgs goes into this if
      return renderAsImg({caption, classes, renderAsLink, url})
    }

    const id = idForPostAttachment({type: 'image', url})
    const availableSizes = availableSizesFor({id, imageMetas, scaledImageIds})

    if (availableSizes.length === 0) {
      throw new Error(`Image with url "${url}" not found.`)
    }
    const imageMeta = imageMetas.filter((im) => im.id === imageId)[0].meta

    return renderAsImgWithSrcset({availableSizes, caption, classes, imageMeta, renderAsLink, url})
  }
}

