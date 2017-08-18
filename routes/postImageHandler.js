import {
  fromGeneratedImagePath, idForPostAttachment, idToPath, idToType, isGeneratedImagePath, isPathImage,
  urlToPath
} from '../utils/id'
import {defaultHeadersFor} from '../utils/http'
import {urlForPostImage} from '../utils/url'

const postImageHandler = {
  async handle({project, url}) {
    const p = urlToPath({url})
    const isScaledImage = isGeneratedImagePath({p})

    if (!isScaledImage) {
      const id = idForPostAttachment({type: 'image', url})
      const value = await project.valueOf({id})
      return {
        body: value.content,
        headers: defaultHeadersFor({url})
      }
    }

    const {originalPath, dimension} = fromGeneratedImagePath({p})
    const id = idForPostAttachment({type: 'image', url: originalPath})
    const value = await project.valueOf({id})

    return {
      body: value.scaled.find((s) => s.width === dimension).content,
      headers: defaultHeadersFor({url})
    }
  },
  async handles({project}) {
    const posts = await project.metaOf({id: 'postCollection'})
    const arrayOfChildMeta = await Promise.all(posts.children.map((post) => project.metaOf({id: post})))
    const postAttachments = arrayOfChildMeta.reduce((acc, meta) => [...acc, ...meta.children], [])

    const postImageIds = postAttachments.filter((pci) => idToType({id: pci}) === 'image')

    const imageMetas = await Promise.all(
      postImageIds.map((c) => project.valueOf({id: `imageMeta@${idToPath({id: c})}`}))
    )

    return imageMetas.reduce((acc, meta) => {
      return [
        ...acc,
        urlForPostImage({id: meta.id}),
        ...meta.scaledImageList.map(({width}) => urlForPostImage({id: meta.id, width}))
      ]
    }, [])
  }
}
export {postImageHandler}
