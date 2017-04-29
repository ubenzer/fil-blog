import {baseUrl, fbAppId, ogLocale} from '../../../../config'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

const template = ({description, image, title, url}) => {
  const metaArray = []
  metaArray.push({content: 'article', property: 'og:type'})
  metaArray.push({content: fbAppId, property: 'fb:app_id'})
  metaArray.push({content: ogLocale, property: 'og:locale'})
  metaArray.push({content: `${baseUrl}${url}`, property: 'og:url'})
  if (title) {
    metaArray.push({content: title, property: 'og:title'})
  }
  if (description) {
    metaArray.push({content: description, property: 'og:description'})
  }
  if (image) {
    metaArray.push({content: `${baseUrl}${image}`, property: 'og:image'})
  }
  return (
    <Helmet meta={metaArray} />
  )
}

template.defaultProps = {
  description: null,
  image: null,
  title: null
}

template.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string.isRequired
}

export default template
