import {page, postSymbol, templateSymbol} from '../../config'
import {idToPath} from './id'
import path from 'path'
import replaceall from 'replaceall'
import slug from 'larvitslugify'

const urlForTemplateCss = ({id}) => replaceall(path.sep, '/', idToPath({id}))

const urlForStaticAsset = ({id}) => {
  // we get rid of post part of id (--->/static<---/robots.txt)
  const p = idToPath({id})
  return replaceall(path.sep, '/', p)
}

const urlForTemplateStylus = () => '/ui.css'

const urlForTemplateJs = () => '/app.js'

const urlForPost = ({id}) => {
  const p = idToPath({id})
  return `${slug(replaceall(path.sep, '/', p), {save: ['/', '-', '_']})}/`
}

const urlForPostAttachment = ({id}) => {
  // we get rid of post part of id (--->/post<---/2010/05/finaller/finaller-500.scaled.webp)
  const p = idToPath({id}).substr(postSymbol.length + 1)
  return slug(replaceall(path.sep, '/', p), {save: ['/', '.', '-', '_']})
}

const urlForCollection = ({page: p}) => p === 0 ? '/' : `/${page}/${p + 1}/` // eslint-disable-line no-confusing-arrow

const urlForSitemap = () => '/sitemap.xml'

const isExternalUrl = ({url}) => url.includes('://') || url.startsWith('//')

// Source: http://stackoverflow.com/a/27728417/158523
const ytPattern = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/

const youtubeUrlToId = ({url}) => {
  const parts = url.match(ytPattern)
  if (parts !== null && parts.length === 2) {
    return parts[1]
  }
  return null
}

const isYoutube = ({url}) => youtubeUrlToId({url}) !== null

export {urlForTemplateCss, urlForPost, urlForPostAttachment, urlForTemplateStylus, isExternalUrl, urlForStaticAsset,
  urlForTemplateJs, urlForSitemap, urlForCollection, youtubeUrlToId, isYoutube}
