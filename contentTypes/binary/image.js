import {compress, meta, resizeByWidth} from '../../utils/image'
import {chokidarChangeFile} from '../../utils/chokidar'
import {contentPath} from '../../../config'
import {idToPath} from '../../utils/id'
import path from 'path'

const widths = [50, 200, 500, 1000, 1500, 2000]

const getScaledImageList = ({baseImageMeta}) => {
  const {width, format} = baseImageMeta

  return widths
    .filter((w) => w < width)
    .map((w) => ({
      format,
      width: w
    }))
}

const getScaledImages = async ({scaledImageList, src}) => {
  const resizedImagePromises = scaledImageList
    .map(({width: w, format: f}) =>
      // as binary buffer
      resizeByWidth({
        format: f,
        src,
        width: w
      }).then((buffer) => ({
        content: buffer,
        format: f,
        width: w
      }))
    )

  return Promise.all(resizedImagePromises)
}

export const image = {
  content: async ({id, type}) => {
    const p = path.join(contentPath, idToPath({id}))

    const m = await meta({src: p})
    const scaledImageList = getScaledImageList({baseImageMeta: m})

    if (type === 'imageMeta') {
      return {
        id,
        meta: m,
        scaledImageList
      }
    }

    const [i, scaled] = await Promise.all([
      compress({
        format: m.format,
        src: p
      }),
      getScaledImages({scaledImageList, src: p})
    ])

    return {
      content: i,
      meta: m,
      scaled
    }
  },
  contentWatcher: ({id, notifyFn}) =>
    chokidarChangeFile(notifyFn, path.join(contentPath, idToPath({id})), {ignoreInitial: true})
}


