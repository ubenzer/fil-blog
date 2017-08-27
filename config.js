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
export const deployConfig = {remoteRepoUrl: 'git@github.com:ubenzer/fil-blog-demo.git'}

// Template config
export const defaultTitle = 'Default Fil Blog'
export const titleTemplate = '%s - Fil'
export const themeColor = '#2196F3'
export const baseUrl = 'https://fil.ubenzer.com'
export const dateFormat = 'LL'
export const locale = 'en'
export const ogLocale = 'en_US'
export const fbAppId = ''
export const postsPerPage = 5
export const aboutMe = 'About Fil'
export const headerTitle = 'A Fil Blog'

// Template strings
export const readPost = 'Read Post'
export const page = 'page'
export const allPosts = 'All Posts'
export const licensePre = 'Contents of this blog licensed under'
export const licensePost = '.'
export const licenseName = 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License'
export const licenseLink = 'http://creativecommons.org/licenses/by-nc-nd/4.0/'
export const generatedAt1 = 'This page generated at'
export const generatedAt2 = 'via'
export const fil = 'Fil'
export const filUrl = 'https://github.com/ubenzer/fil'
export const generatedAt3 = '.'
export const authorName = 'Anita Alvarez'
export const authorMiniBio = 'Photographer'
