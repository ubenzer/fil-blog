import React from 'react'
import {defaultHeadersFor} from '../../../fil/app/utils/http'
import {idForPost} from '../utils/id'
import path from 'path'
import {render} from '../utils/template'
import {requireUncached} from '../utils/require'
import {templatePath} from '../../config'
import {urlForPost} from '../utils/url'

const singlePostHandler = {
  async handle({project, url}) {
    const postIds = (await project.metaOf({id: null, type: 'postCollection'})).children
    const id = idForPost({postIds, url})
    const post = await project.valueOf({id, type: 'post'})

    const Template = requireUncached(path.join(process.cwd(), templatePath, 'blogPost')).default
    const str = render({jsx: <Template post={post} url={url} />})

    return {body: str}
  },
  async handles({project}) {
    const posts = await project.metaOf({id: null, type: 'postCollection'})
    return posts.children.map(({id}) => urlForPost({id}))
  }
}
export {singlePostHandler}
