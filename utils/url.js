import {page, postSubfolder, staticAssetsSubfolder, templateSubfolder} from "../config"
import {idToPath} from "./id"
import path from "path"
import replaceall from "replaceall"
import slug from "larvitslugify"

const urlForTemplateCss = ({id}) => replaceall(path.sep, "/", idToPath({id}))

const urlForStaticAsset = ({id}) => {
  // we get rid of post part of id (--->/static<---/robots.txt)
  const p = idToPath({id}).substr(staticAssetsSubfolder.length + 1)
  return replaceall(path.sep, "/", p)
}

const urlForTemplateStylus = () => {
  const p = replaceall(path.sep, "/", templateSubfolder)
  return `/${p}/ui.css`
}

const urlForTemplateJs = () => {
  const p = replaceall(path.sep, "/", templateSubfolder)
  return `/${p}/app.js`
}

const urlForPost = ({id}) => {
  const p = idToPath({id})
  return slug(replaceall(path.sep, "/", p), {save: ["/"]})
}

const urlForPostAttachment = ({id}) => {
  // we get rid of post part of id (--->/post<---/2010/05/finaller/finaller-500.scaled.webp)
  const p = idToPath({id}).substr(postSubfolder.length + 1)
  return slug(replaceall(path.sep, "/", p), {save: ["/", "."]})
}

const urlForCollection = ({page: p}) => p === 0 ? "/" : `/${page}/${p + 1}` // eslint-disable-line no-confusing-arrow

const urlForSitemap = () => "/sitemap.xml"

const isExternalUrl = ({url}) => url.includes("://") || url.startsWith("//")

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
