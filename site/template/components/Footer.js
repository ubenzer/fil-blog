import {
  dateFormat, fil, filUrl, generatedAt1, generatedAt2, generatedAt3, licenseLink, licenseName, licensePost, licensePre,
  locale
} from '../../../config'
import React from 'react'
import moment from 'moment'
import {urlForStaticAsset} from '../../../app/utils/url'

const Footer = () =>
  <div className="footer">
    <div className="footer__copyright-holder">
      <p>
        <a href={licenseLink} rel="license noopener noreferrer" target="_blank">
          <img alt={licenseName} src={urlForStaticAsset({id: '/img/cclicense.png'})} />
        </a>
      </p>
      <p>
        <span>{licensePre}&nbsp;</span>
        <a href={licenseLink} rel="license noopener noreferrer" target="_blank">{licenseName}</a>
        <span>&nbsp;{licensePost}</span>
      </p>
    </div>
    <div className="footer__generator">
      <span>{generatedAt1}&nbsp;</span>
      <span>{moment().locale(locale).format(dateFormat)}</span>
      <span>&nbsp;{generatedAt2}&nbsp;</span>
      <a
        href={filUrl}
        target="_blank" // eslint-disable-line react/jsx-no-target-blank
      >{fil}
      </a>
      <span>&nbsp;{generatedAt3}</span>
    </div>
  </div>

export {Footer}
