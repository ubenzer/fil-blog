import {dateSorter, postDateSelector, sort} from "../utils/sorting"
import React from "react"
import {calculatePagination} from "../utils/collection"
import {defaultHeadersFor} from "../utils/http"
import {idForCollection} from "../utils/id"
import path from "path"
import {render} from "../utils/template"
import {requireUncached} from "../utils/require"
import {templatePath} from "../config"
import {urlForCollection} from "../utils/url"

const chunkSize = 10

const recentPostsCollectionHandler = {
  async handle({project, url}) {
    const pageNumber = idForCollection({url}).page
    const postIds = (await project.metaOf({id: "postCollection"})).children
    const posts = await Promise.all(postIds.map((id) => project.valueOf({id})))

    const sortedPosts = sort({
      array: posts,
      reversed: true,
      selectorFn: postDateSelector,
      sorterFn: dateSorter
    })

    const paginatedPostCollection = calculatePagination({array: sortedPosts, chunkSize})
    const page = paginatedPostCollection[pageNumber]

    const Template = requireUncached(path.join(process.cwd(), templatePath, "multiplePosts")).default
    const str = render({
      jsx: <Template
        currentPage={page.pageNumber}
        posts={page.content}
        totalPages={paginatedPostCollection.length}
           />
    })

    return {
      body: str,
      headers: defaultHeadersFor({url: `${url}/index.html`})
    }
  },
  async handles({posts}) {
    const paginatedPostCollection = calculatePagination({array: posts, chunkSize})

    return paginatedPostCollection.map((xyz, index) => urlForCollection({page: index}))
  },
  async handlesArguments({project}) {
    const posts = await project.metaOf({id: "postCollection"})
    return {posts: posts.children}
  }
}
export {recentPostsCollectionHandler}
