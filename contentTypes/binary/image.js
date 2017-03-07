import {compress, meta} from "../../utils/image"
import {idToPath, pathToIdPart, toGeneratedImagePath} from "../../utils/id"
import {chokidar$} from "../../utils/chokidar"
import {contentPath} from "../../index"
import path from "path"

// Null stands for "original"
const imageFormats = ["webp", null]
const widths = [500, 1000, 1500, 2000]

const watcher$ = ({id}) => chokidar$(path.join(contentPath, idToPath({id})), {ignoreInitial: true})

export const image = {
  children: async ({id}) => {
    const imagePath = idToPath({id})
    const imageMeta = await meta({src: path.join(contentPath, imagePath)})
    const {width} = imageMeta

    return widths
      .filter((w) => w < width)
      .reduce((acc, w) =>
        [...acc, ...imageFormats.map((f) => ({
          format: f,
          width: w
        }))]
      , [])
      .map(({width: w, format}) => {
        const scaledImagePath = toGeneratedImagePath({
          dimension: w,
          ext: format,
          originalPath: imagePath
        })
        const p = pathToIdPart({p: scaledImagePath})

        return `scaledImage@${p}`
      })
  },
  childrenWatcher$: watcher$,

  content: async ({id}) => {
    const p = path.join(contentPath, idToPath({id}))
    // noinspection JSUnresolvedFunction
    const [m, i] = await Promise.all([meta({src: p}), compress({src: p})])

    return {
      content: i,
      meta: m
    }
  },
  contentWatcher$: watcher$
}


