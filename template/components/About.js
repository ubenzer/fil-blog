import {authorMiniBio, authorName} from '../../../config'
import React from 'react'
import {urlForStaticAsset} from '../../../app/utils/url'

const About = () =>
  <div className="about">
    <img className="about__image round-img" src={urlForStaticAsset({id: 'img/profile.jpg'})} />
    <h1 className="about__name">{authorName}</h1>
    <h2 className="about__mini-bio">{authorMiniBio}</h2>
  </div>

About.propTypes = {}

export {About}
