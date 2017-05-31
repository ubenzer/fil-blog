import path from 'path'

// App config

// These defines root paths
export const contentPath = path.join('.')

// These defines the lookup paths for each content type
export const postPath = path.join(contentPath, 'contents', 'post')
export const cssPath = path.join(contentPath, 'site', 'css')
export const templatePath = path.join(contentPath, 'site', 'template')
export const staticAssetPath = path.join(contentPath, 'site', 'static')
export const jsPath = path.join(contentPath, 'site', 'js')

// These defines caching and output related paths
export const cachePath = './cache'
export const outPath = './dist'

// This is used by fil-deploy-github-pages
export const deployConfig = {remoteRepoUrl: 'git@github.com:ubenzer/ubenzer.github.io.git'}

// Template config
export const defaultTitle = 'Default Fil Blog'
export const titleTemplate = '%s - Fil'
export const themeColor = '#2196F3'
export const baseUrl = 'https://ubenzer.com'
export const dateFormat = 'LL'
export const locale = 'tr'
export const ogLocale = 'tr_TR'
export const fbAppId = '106731154350'
export const postsPerPage = 5
export const aboutMe = 'Hakkımda'

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
export const authorName = 'Umut Benzer'
export const authorMiniBio = 'Software Engineer, MSc. in Berlin'
