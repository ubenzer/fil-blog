import {BlogPost} from './components/BlogPost'
import Helmet from 'react-helmet'
import {MainContainer} from './components/MainContainer'
import {Pagination} from './components/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import {allPosts} from '../../config'
import {blogPostPropType} from './propTypes'
import {urlForCollection} from '../../app/utils/url'

const template = ({currentPage, posts, totalPages}) =>
  <MainContainer>
    <Helmet title={`${allPosts} ${currentPage}/${totalPages}`} />
    <div>
      {
        posts.map((post) =>
          <BlogPost key={post.id}
            post={post}
            renderExcerpt
          />
        )
      }
      <Pagination currentPage={currentPage} pageUrlFn={urlForCollection} totalPages={totalPages} />
    </div>
  </MainContainer>


template.propTypes = {
  currentPage: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(blogPostPropType).isRequired,
  totalPages: PropTypes.number.isRequired
}

export default template
