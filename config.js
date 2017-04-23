import path from 'path'

// App config
export const contentPath = path.join('contents')
export const postSubfolder = 'post'
export const templateSubfolder = 'template'
export const staticAssetsSubfolder = 'static'
export const frontendJsSubfolder = 'frontend-js'
export const postPath = path.join(contentPath, postSubfolder)
export const templatePath = path.join(contentPath, templateSubfolder)
export const staticAssetsPath = path.join(contentPath, staticAssetsSubfolder)
export const frontendJsPath = path.join(contentPath, frontendJsSubfolder)
export const cachePath = './cache'
export const outPath = './dist'
export const remoteRepoUrl = 'git@github.com:ubenzer/ubenzer.github.io.git'
export const postsPerPage = 5

// Template config
export const defaultTitle = 'UBenzer'
export const titleTemplate = '%s - UBenzer'
export const themeColor = '#2196F3'
export const baseUrl = 'https://ubenzer.com'
export const dateFormat = 'LL'
export const locale = 'tr'
export const ogLocale = 'tr_TR'
export const fbAppId = '106731154350'

// Template strings
export const readPost = 'Devamını oku'
export const page = 'sayfa'
export const allPosts = 'Tüm Yazılar'
export const licensePre = 'Bu sitedeki tüm yazı ve görseller'
export const licensePost = 'ile lisanslanmıştır.'
export const licenseName = 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License'
export const licenseLink = 'http://creativecommons.org/licenses/by-nc-nd/4.0/'
export const generatedAt1 = 'Bu sayfa'
export const generatedAt2 = 'tarihinde'
export const fil = 'Fil'
export const filUrl = 'https://github.com/ubenzer/fil'
export const generatedAt3 = 'ile yaratılmıştır.'
