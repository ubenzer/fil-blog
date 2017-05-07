import {AppBar} from './AppBar'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({bigHeader}) =>
  <header className={`header ${bigHeader ? 'header--big' : ''}`}>
    <AppBar />
  </header>

Header.propTypes = {}


Header.defaultProps = {bigHeader: false}

Header.propTypes = {bigHeader: PropTypes.bool}

export {Header}
