import React from 'react'
import {urlForStaticAsset} from '../../../app/utils/url'

const About = () =>
  <div className="about">
    <img className="about__image" src={urlForStaticAsset({id: 'static@/img/profile.jpg'})} />
    <h1 className="about__name">Umut Benzer</h1>
    <h2 className="about__mini-bio">Software Engineer in Berlin</h2>
  </div>

About.propTypes = {}

export {About}
