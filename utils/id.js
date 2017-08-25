import {page, postPath, staticAssetPath} from '../../config'
import {IMAGE_EXTENSIONS} from './image'
import path from 'path'
import replace from 'replaceall'
import {urlForPost} from './url'

const scaledImagePostfix = '.scaled-'

const fromGeneratedImagePath = ({p}) => {
  const fileExtension = path.extname(p)
  const fileName = path.basename(p, fileExtension)
  const fileNamePieces = fileName.split(scaledImagePostfix)

  if (fileNamePieces.length < 2) { return null }

  const afterScaledImagePostFix = fileNamePieces.pop()
  const dimension = parseInt(afterScaledImagePostFix, 10)

  const originalPath = path.join(p, '..', `${fileNamePieces.join(scaledImagePostfix)}${fileExtension}`)

  return {dimension, ext: fileExtension.substr(1), originalPath}
}

const toGeneratedImagePath = ({originalPath, dimension}) => {
  const fileExtension = path.extname(originalPath)
  const fileName = path.basename(originalPath, fileExtension)

  // / a/b/c.jpg becomes a/b/c.scaled-500.jpg
  const outFileName = `${fileName}${scaledImagePostfix}${dimension}${fileExtension}`

  return path.join(originalPath, '..', outFileName)
}

const idToPath = ({id}) => replace('/', path.sep, id)

const pathToId = ({p}) => replace(path.sep, '/', p)

const urlToPath = ({url}) => replace('/', path.sep, url)

const isPathImage = ({p}) => IMAGE_EXTENSIONS.filter((ie) => path.extname(p) === `.${ie}`).length > 0

const isGeneratedImagePath = ({p}) => {
  try {
    const {dimension, originalPath, ext} = fromGeneratedImagePath({p})

    return Boolean(originalPath && dimension && ext)
  } catch (e) {
    return false
  }
}

const postRelativeIdConversion = ({postId, relativeUrl}) => {
  const pstPath = path.join(idToPath({id: postId}), '..')
  const relPath = urlToPath({url: relativeUrl})
  const absPath = path.join(pstPath, relPath)
  return `${pathToId({p: absPath})}`
}

const postIdToImageId = ({postId, imageRelativeUrl}) =>
  postRelativeIdConversion({postId, relativeUrl: imageRelativeUrl})

const postIdToAttachmentId = ({postId, attachmentRelativeUrl}) =>
  postRelativeIdConversion({postId, relativeUrl: attachmentRelativeUrl})

const idForPostAttachment = ({url}) => `${postPath}${url}`

const idForStaticAsset = ({url}) => `${staticAssetPath}${url}`

const idForPost = ({postIds, url}) =>
  postIds
    .map(({id: c}) => ({id: c, url: urlForPost({id: c})}))
    .filter((c) => c.url === url)[0].id

const idForCollection = ({url}) => {
  if (url.length === 1) { return {page: 0} }
  const pageNumberStr = url.substr(page.length + 2, url.length - page.length - 3)
  return {page: Number(pageNumberStr) - 1}
}

export {idToPath, pathToId, urlToPath, isGeneratedImagePath, idForPostAttachment, idForPost,
  fromGeneratedImagePath, toGeneratedImagePath, isPathImage, postIdToImageId, postIdToAttachmentId,
  idForStaticAsset, idForCollection}
