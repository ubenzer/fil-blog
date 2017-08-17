import {idForPostAttachment, idToType} from '../utils/id'
import {defaultHeadersFor} from '../utils/http'
import {urlForPostAttachment} from '../utils/url'

const binaryPassthroughHandler = {
  async handle({project, url}) {
    const id = idForPostAttachment({type: 'file', url})
    const value = await project.valueOf({id})

    return {
      body: value.content,
      headers: defaultHeadersFor({url})
    }
  },
  async handles({nonImageAttachments}) {
    return nonImageAttachments.map((id) => urlForPostAttachment({id}))
  },
  async handlesArguments({project}) {
    const posts = await project.metaOf({id: 'postCollection'})
    const arrayOfChildMeta = await Promise.all(posts.children.map((post) => project.metaOf({id: post})))
    const postAttachments = arrayOfChildMeta.reduce((acc, meta) => [...acc, ...meta.children], [])

    const nonImageAttachments = postAttachments.filter((pci) => idToType({id: pci}) !== 'image')
    return {nonImageAttachments}
  }
}
export {binaryPassthroughHandler}
