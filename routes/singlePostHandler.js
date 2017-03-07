import React from "react"
import {defaultHeadersFor} from "../utils/http"
import {idForPost} from "../utils/id"
import path from "path"
import {render} from "../utils/template"
import {requireUncached} from "../utils/require"
import {templatePath} from "../index"
import {urlForPost} from "../utils/url"

const singlePostHandler = {
  async handle({project, url}) {
    const postIds = (await project.metaOf({id: "postCollection"})).children
    const id = idForPost({postIds, url})
    const post = await project.valueOf({id})

    const Template = requireUncached(path.join(process.cwd(), templatePath, "blogPost")).default
    const str = render({jsx: <Template post={post} />})

    return {
      body: str,
      headers: defaultHeadersFor({url: `${url}/index.html`})
    }
  },
  async handles({posts}) {
    return posts.map((p) => urlForPost({id: p}))
  },
  async handlesArguments({project}) {
    const posts = await project.metaOf({id: "postCollection"})
    return {posts: posts.children}
  }
}
export {singlePostHandler}
