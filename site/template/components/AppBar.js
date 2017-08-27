import {aboutMe, headerTitle} from '../../../config'
import React from 'react'
import {urlForStaticAsset} from '../../../app/utils/url'

const AppBar = () =>
  <div className="app-bar">
    <h1 className="app-bar__title app-bar__text">
      <a className="app-bar__title-link" href="/">{ headerTitle }</a>
    </h1>
    <div className="app-bar__spacer" />
    <a className="app-bar__about-link app-bar__text" href="/hakkimda/">
      { aboutMe }
    </a>
    <div className="app-bar__mobile-menu-container mdc-menu-anchor">
      <button className="mdc-button app-bar__mobile-button">
        <img
          className="app-bar__mobile-button-icon"
          src={urlForStaticAsset({id: '/img/ic_more_vert_white_24px.svg'})}
        />
      </button>

      <div
        className="mdc-simple-menu app-bar__mobile-menu"
        style={{position: 'absolute'}}
        tabIndex="-1"
      >
        <ul aria-hidden="true" className="mdc-simple-menu__items mdc-list" role="menu">
          <li
            className="mdc-list-item"
            data-href="/hakkimda/"
            role="menuitem"
            tabIndex="0"
          >
            { aboutMe }
          </li>
        </ul>
      </div>
    </div>
  </div>

AppBar.propTypes = {}

export {AppBar}
