import {cachePath, outPath, templatePath} from "./deploy/config"
import {binaryPassthroughHandler} from "./routes/postAttachmentPassthroughHandler"
import {chokidar$} from "./utils/chokidar"
import {cssCollection} from "./contentTypes/templateItems/cssCollection"
import {file} from "./contentTypes/binary/file"
import {hashOf} from "./utils/hash"
import {image} from "./contentTypes/binary/image"
import {post} from "./contentTypes/post/post"
import {postCollection} from "./contentTypes/post/postCollection"
import {recentPostsCollectionHandler} from "./routes/recentPostsCollectionHandler"
import {scaledImage} from "./contentTypes/binary/scaledImage"
import {singlePostHandler} from "./routes/singlePostHandler"
import {sitemap} from "./contentTypes/sitemap"
import {sitemapHandler} from "./routes/sitemapHandler"
import {staticAssetHandler} from "./routes/staticAssetHandler"
import {staticAssetsCollection} from "./contentTypes/staticAssetsCollection"
import {stylus} from "./contentTypes/templateItems/stylus"
import {templateCssHandler} from "./routes/templateCssHandler"
import {templateStylusHandler} from "./routes/templateStylusHandler"

// noinspection JSUnusedGlobalSymbols
const project = {
  cachePath: () => cachePath,
  contentTypes: () => ({
    cssCollection,
    file,
    image,
    post,
    postCollection,
    scaledImage,
    sitemap,
    staticAssetsCollection,
    stylus
  }),
  async contentVersion() {
    return hashOf({p: "./contents"})
  },
  outPath: () => outPath,
  routeHandlers: () => ({
    binaryPassthroughHandler,
    recentPostsCollectionHandler,
    singlePostHandler,
    sitemapHandler,
    staticAssetHandler,
    templateCssHandler,
    templateStylusHandler
  }),
  // Observable for changes that doesn't belong to any content (such as templates)
  watcher$() {
    return chokidar$(`${templatePath}/**/*.js`, {ignoreInitial: true})
  }
}

export {project}

export default project
