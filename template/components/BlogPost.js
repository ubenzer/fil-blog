import {dateFormat, locale, readPost} from '../../../config'
import {Button} from './Button'
import PropTypes from 'prop-types'
import React from 'react'
import {blogPostPropType} from '../propTypes'
import moment from 'moment'
import {urlForPost} from '../../../app/utils/url'

const BlogPost = ({post, renderExcerpt}) => {
  const postUrl = urlForPost({id: post.id})

  return <article className="card main-container__items">
    <div className="card__contents blog-post">
      <div className="blog-post__date">
        {moment(post.createDate).locale(locale)
          .format(dateFormat)}
      </div>
      <h1 className="blog-post__title">
        <a href={postUrl}>{post.title}</a>
      </h1>
      {renderExcerpt &&
        <div
          className="markdown-content blog-post__body blog-post__excerpt"
          dangerouslySetInnerHTML={{__html: post.htmlExcerpt}}
        />
      }
      {!renderExcerpt &&
        <div
          className="markdown-content blog-post__body blog-post__content"
          dangerouslySetInnerHTML={{__html: post.htmlContent}}
        />
      }
    </div>
    {renderExcerpt &&
      <div className="card__actions">
        <Button text={readPost} url={postUrl} />
      </div>
    }
  </article>
}
BlogPost.propTypes = {
  post: blogPostPropType.isRequired,
  renderExcerpt: PropTypes.bool
}

BlogPost.defaultProps = {renderExcerpt: false}

export {BlogPost}
