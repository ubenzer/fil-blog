import {dateSorter, postDateSelector, sort} from '../utils/sorting'
import {postsPerPage, templatePath} from '../../config'
import React from 'react'
import {calculatePagination} from '../utils/collection'
import {defaultHeadersFor} from '../../../fil/app/utils/http'
import {idForCollection} from '../utils/id'
import path from 'path'
import {render} from '../utils/template'
import {requireUncached} from '../utils/require'
import {urlForCollection} from '../utils/url'

const chunkSize = postsPerPage

const recentPostsCollectionHandler = {
  async handle({project, url}) {
    const pageNumber = idForCollection({url}).page
    const postIds = (await project.metaOf({id: null, type: 'postCollection'})).children
    const posts = await Promise.all(postIds.map(({id, type}) => project.valueOf({id, type})))

    const sortedPosts = sort({
      array: posts,
      reversed: true,
      selectorFn: postDateSelector,
      sorterFn: dateSorter
    })

    const paginatedPostCollection = calculatePagination({array: sortedPosts, chunkSize})
    const page = paginatedPostCollection[pageNumber]

    const Template = requireUncached(path.join(process.cwd(), templatePath, 'multiplePosts')).default
    const str = render({
      jsx: <Template
        currentPage={page.pageNumber}
        posts={page.content}
        totalPages={paginatedPostCollection.length}
           />
    })

    return {body: str}
  },
  async handles({project}) {
    const posts = await project.metaOf({id: null, type: 'postCollection'})
    const paginatedPostCollection = calculatePagination({array: posts.children, chunkSize})

    return paginatedPostCollection.map((xyz, index) => urlForCollection({page: index}))
  }
}
export {recentPostsCollectionHandler}
