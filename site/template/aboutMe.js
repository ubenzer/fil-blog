import {authorMiniBio, authorName} from '../../config'
import {MainContainer} from './components/MainContainer'
import PropTypes from 'prop-types'
import React from 'react'
import {urlForStaticAsset} from '../../app/utils/url'

const template = ({bodyText}) =>
  <MainContainer bigHeader fullWidth>
    <div className="card introduction-card main-container__items">
      <div className="introduction-card__about_container">
        <img
          alt={authorName}
          className="introduction-card__image round-img"
          src={urlForStaticAsset({id: '/img/profile.jpg'})}
        />
        <h1 className="introduction-card__name">{authorName}</h1>
        <h2 className="introduction-card__mini-bio">{authorMiniBio}</h2>
      </div>
      <div className="introduction-card__profile_container">
        <section
          className="introduction-card__bio"
          dangerouslySetInnerHTML={{__html: bodyText}}
        />
      </div>
    </div>
  </MainContainer>


template.propTypes = {bodyText: PropTypes.string.isRequired}

export default template
