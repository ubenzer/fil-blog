import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

const template = ({description}) => {
  const metaArray = []
  if (description) {
    metaArray.push({content: description, name: 'description'})
  }
  return (
    <Helmet meta={metaArray} />
  )
}

template.defaultProps = {description: null}

template.propTypes = {description: PropTypes.string}

export default template
