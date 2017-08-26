import {fromGeneratedImagePath, idForPostAttachment, idToPath, isGeneratedImagePath} from '../utils/id'
import {urlForPostImage} from '../utils/url'

const postImageHandler = {
  async handle({project, url}) {
    const p = idToPath({id: url})
    const isScaledImage = isGeneratedImagePath({p})

    if (!isScaledImage) {
      const id = idForPostAttachment({url})
      const value = await project.valueOf({id, type: 'image'})
      return {body: value.content}
    }

    const {originalPath, dimension} = fromGeneratedImagePath({p})
    const id = idForPostAttachment({type: 'image', url: originalPath})
    const value = await project.valueOf({id, type: 'image'})

    return {body: value.scaled.find((s) => s.width === dimension).content}
  },
  async handles({project}) {
    const posts = await project.metaOf({id: null, type: 'postCollection'})
    const arrayOfChildMeta = await Promise.all(posts.children.map(({id, type}) => project.metaOf({id, type})))
    const postAttachments = arrayOfChildMeta.reduce((acc, meta) => [...acc, ...meta.children], [])

    const postImageIds = postAttachments.filter(({type}) => type === 'image')

    const imageMetas = await Promise.all(
      postImageIds.map(({id}) => project.valueOf({id, type: 'imageMeta'}))
    )

    return imageMetas.reduce((acc, meta) => [
      ...acc,
      urlForPostImage({id: meta.id}),
      ...meta.scaledImageList.map(({width}) => urlForPostImage({id: meta.id, width}))
    ], [])
  },
  useHandleCache: () => false,
  useHandlesCache: () => false
}
export {postImageHandler}
