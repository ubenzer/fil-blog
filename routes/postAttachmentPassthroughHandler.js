import {idForPostAttachment} from '../utils/id'
import {urlForPostAttachment} from '../utils/url'

const binaryPassthroughHandler = {
  async handle({project, url}) {
    const id = idForPostAttachment({type: 'file', url})
    const value = await project.valueOf({id, type: 'file'})

    return {body: value.content}
  },
  async handles({project}) {
    const posts = await project.metaOf({id: null, type: 'postCollection'})
    const arrayOfChildMeta = await Promise.all(posts.children.map(({id, type}) => project.metaOf({id, type})))
    const postAttachments = arrayOfChildMeta.reduce((acc, meta) => [...acc, ...meta.children], [])

    const nonImageAttachments = postAttachments.filter(({type}) => type !== 'image')
    return nonImageAttachments.map(({id}) => urlForPostAttachment({id}))
  }
}
export {binaryPassthroughHandler}
