import {DefaultHeader} from '../defaultHeader'
import {Footer} from './Footer'
import {GoogleAnalytics} from './GoogleAnalytics'
import {Header} from './Header'
import PropTypes from 'prop-types'
import React from 'react'
import {Sidebar} from './Sidebar'

const getClassName = ({fullWidth}) => {
  const classes = ['main-container__main-content']
  if (fullWidth) {
    classes.push('main-container__main-content--full')
  }
  return classes.join(' ')
}
const MainContainer = ({bigHeader, children, fullWidth}) =>
  <div>
    <DefaultHeader />
    <Header bigHeader={bigHeader} />
    <div className="main-container">
      <div className={getClassName({fullWidth})}>
        {children}
      </div>
      {!fullWidth && <Sidebar />}
    </div>
    <div className="main-container">
      <Footer />
      <GoogleAnalytics />
    </div>
  </div>

MainContainer.defaultProps = {
  bigHeader: false,
  fullWidth: false
}

MainContainer.propTypes = {
  bigHeader: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  fullWidth: PropTypes.bool
}

export {MainContainer}
