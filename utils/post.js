import cheerio from 'cheerio'
import debugc from 'debug'
import emoji from 'markdown-it-emoji'
import frontMatter from 'front-matter'
import markdownHighlightJs from 'markdown-it-highlightjs'
import {markdownImageParser} from '../renderer/image'
import markdownIt from 'markdown-it'
import {markdownLinkParser} from '../renderer/link'

const debug = debugc('fil:utils:post')

const extractTitleFromMarkdown = ({markdown}) => {
  const lines = markdown.split('\n')

  while (lines.length > 0 && lines[0].trim().length === 0) {
    lines.shift()
  }
  if (lines.length === 0 || lines[0].length < 3 || lines[0].substr(0, 2) !== '# ') {
    return {
      content: lines.join('\n'),
      title: null
    }
  }
  const titleLine = lines.shift()

  return {
    content: lines.join('\n'),
    title: titleLine.substr(2)
  }
}

const calculateHtmlContent = ({id, imageMetas, markdownContent, scaledImageIds}) => {
  // noinspection JSUnusedGlobalSymbols
  const md = markdownIt()
    .use(markdownImageParser, {imageMetas, postId: id, scaledImageIds})
    .use(markdownLinkParser, {postId: id})
    .use(markdownHighlightJs, {})
    .use(emoji)

  const separatedContent = markdownContent.split('---more---')

  if (separatedContent.length > 1) {
    const htmlExcerpt = md.render(separatedContent[0])
    const htmlContent = md.render(separatedContent.join('\n\n'))

    return {
      htmlContent,
      htmlExcerpt
    }
  }

  const htmlContent = md.render(markdownContent)

  return {
    htmlContent,
    htmlExcerpt: htmlContent
  }
}

const getDescription = ({htmlContent}) => {
  const $ = cheerio.load(htmlContent)
  return $('p')
    .first()
    .text()
    .trim()
}

const getPostImage = ({htmlContent}) => {
  const $ = cheerio.load(htmlContent)
  const linkUrl = $('.img.big')
    .first()
    .parent('a')
    .attr('href')
  if (linkUrl) {
    return linkUrl
  }
  // More alternatives could be added
  return null
}

const rawContentToPostObject = async ({id, imageMetas, rawFileContent, scaledImageIds}) => {
  const doc = frontMatter(rawFileContent)
  const createDate = doc.attributes.created
  const editDate = doc.attributes.edited instanceof Date ? doc.attributes.edited : new Date(createDate)
  const taxonomy = doc.attributes.taxonomy instanceof Object ? doc.attributes.taxonomy : {}
  const extractedTitleObject = extractTitleFromMarkdown({markdown: doc.body})

  const markdownContent = extractedTitleObject.content
  const title = typeof doc.attributes.title === 'string' ? doc.attributes.title : extractedTitleObject.title
  const {htmlContent, htmlExcerpt} = calculateHtmlContent({id, imageMetas, markdownContent, scaledImageIds})
  const imgUrl = getPostImage({htmlContent})
  const description = getDescription({htmlContent})

  if (imgUrl === null) {
    debug(`No post image found for ${id}`)
  }

  return {
    createDate,
    description,
    editDate,
    htmlContent,
    htmlExcerpt,
    imgUrl,
    taxonomy,
    title
  }
}

export {rawContentToPostObject, extractTitleFromMarkdown}
