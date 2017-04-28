import {DefaultHeader} from '../defaultHeader'
import {Footer} from './Footer'
import {GoogleAnalytics} from './GoogleAnalytics'
import {Header} from './Header'
import PropTypes from 'prop-types'
import React from 'react'
import {Sidebar} from './Sidebar'

const MainContainer = ({children}) =>
  <div>
    <DefaultHeader />
    <Header />
    <div className="main-container">
      <div className="main-content">
        {children}
      </div>
      <Sidebar />
    </div>
    <div className="main-container">
      <Footer />
      <GoogleAnalytics />
    </div>
  </div>

MainContainer.propTypes = {children: PropTypes.arrayOf(PropTypes.element).isRequired}

export {MainContainer}
