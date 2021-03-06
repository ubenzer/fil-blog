import {BlogPost} from './components/BlogPost'
import {Comments} from './components/Comments'
import Helmet from 'react-helmet'
import {MainContainer} from './components/MainContainer'
import MetaDescription from './components/head/MetaDescription'
import OpenGraph from './components/head/OpenGraph'
import PropTypes from 'prop-types'
import React from 'react'
import {baseUrl} from '../../config'
import {blogPostPropType} from './propTypes'

const template = ({post, url}) =>
  <MainContainer>
    <Helmet
      link={[{href: `${baseUrl}${url}`, rel: 'canonical'}]}
      title={post.title}
    />
    <MetaDescription description={post.description} />
    <OpenGraph
      description={post.description}
      image={post.imgUrl}
      title={post.title}
      url={url}
    />
    <BlogPost post={post} />
    <Comments url={url} />
  </MainContainer>


template.propTypes = {
  post: blogPostPropType.isRequired, // eslint-disable-line react/no-typos
  url: PropTypes.string.isRequired
}

export default template
