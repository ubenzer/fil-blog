import path from "path"

export const defaultTitle = "UBenzer"
export const titleTemplate = "%s - UBenzer"
export const themeColor = "#2196F3"
export const baseUrl = "https://ubenzer.com"
export const dateFormat = "LL"
export const locale = "tr"

export const contentPath = path.join("contents")
export const postSubfolder = "post"
export const templateSubfolder = "template"
export const staticAssetsSubfolder = "static"
export const frontendJsSubfolder = "frontend-js"
export const postPath = path.join(contentPath, postSubfolder)
export const templatePath = path.join(contentPath, templateSubfolder)
export const staticAssetsPath = path.join(contentPath, staticAssetsSubfolder)
export const frontendJsPath = path.join(contentPath, frontendJsSubfolder)
export const cachePath = "./cache"
export const outPath = "./dist"
export const remoteRepoUrl = "git@github.com:ubenzer/ubenzer.github.io.git"
export const postsPerPage = 5

export const readPost = "Devamını oku"
export const page = "sayfa"
export const allPosts = "Tüm Yazılar"
