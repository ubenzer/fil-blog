import {aboutMe, headerTitle} from '../../../config'
import React from 'react'

const AppBar = () =>
  <div className="app-bar">
    <h1 className="app-bar__title">
      <a className="app-bar__title-link" href="/">{ headerTitle }</a>
    </h1>
    <div className="app-bar__spacer" />
    <a className="app-bar__about-link" href="/hakkimda/">
      { aboutMe }
    </a>
  </div>

AppBar.propTypes = {}

export {AppBar}
