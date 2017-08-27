import sharp from 'sharp'

// Gif is not supported
const IMAGE_EXTENSIONS = ['jpg', 'png', 'webp']

const resizeByWidth = async ({src, width, format}) =>
  sharp(src)
    .resize(width, null)
    .toFormat(format, {quality: 50})
    .toBuffer()
    .catch((e) => {
      // For some reason promises rejected via sharp library doesn't have the stack trace. So I catch and rethrow them.
      throw new Error(`${src} - ${e.message}`)
    })


const compress = async ({src, format}) => {
  try {
    return sharp(src)
      .toFormat(format, {quality: 75})
      .toBuffer()
      .catch((e) => {
        // For some reason promises rejected via sharp library doesn't have the stack trace. So I catch/rethrow them.
        throw new Error(`${src} - ${e.message}`)
      })
  } catch (e) {
    return Promise.reject(new Error(`${src} - ${e.message}`))
  }
}

const meta = async ({src}) =>
  sharp(src)
    .metadata()
    .then(({format, width, height}) => ({
      format,
      height,
      width
    }))
    .catch((e) => {
      // For some reason promises rejected via sharp library doesn't have the stack trace. So I catch and rethrow them.
      throw new Error(`${src} - ${e.message}`)
    })

export {resizeByWidth, meta, compress, IMAGE_EXTENSIONS}
