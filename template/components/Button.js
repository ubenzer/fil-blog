import PropTypes from 'prop-types'
import React from 'react'

const getClassName = ({style, isDisabled}) => {
  const classes = ['button']
  classes.push(`button_style_${style}`)
  if (isDisabled) {
    classes.push('button_disabled')
  }
  return classes.join(' ')
}

const Button = ({icon, url, text, style, isDisabled}) => {
  let iconEl = null
  if (icon) {
    iconEl = <img className="button__icon" src={icon} />
  }

  let textEl = null
  if (text) {
    textEl = text
  }

  if (isDisabled) {
    return (
      <button className={getClassName({isDisabled, style})} disabled>
        <span className="button__inner-wrapper">
          {iconEl}{textEl}
        </span>
      </button>
    )
  }
  return (
    <a className={getClassName({isDisabled, style})} href={url}>
      <span className="button__inner-wrapper">
        {iconEl}{textEl}
      </span>
    </a>
  )
}


Button.propTypes = {
  icon: PropTypes.string,
  isDisabled: PropTypes.bool,
  style: PropTypes.string,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

Button.defaultProps = {
  icon: null,
  isDisabled: false,
  style: 'primary'
}

export {Button}
