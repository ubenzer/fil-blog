import {defaultTitle, locale, themeColor, titleTemplate} from '../../config'
import {urlForStaticAsset, urlForTemplateJs, urlForTemplateStylus} from '../../app/utils/url'
import Helmet from 'react-helmet'
import React from 'react'

const DefaultHeader = () =>
  <Helmet
    defaultTitle={defaultTitle}
    htmlAttributes={{lang: locale}}
    link={[
      {href: urlForTemplateStylus(), media: 'screen', rel: 'stylesheet', type: 'text/css'},
      {
        href: 'https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&amp;subset=latin-ext', // eslint-disable-line max-len
        media: 'screen',
        rel: 'stylesheet',
        type: 'text/css'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/apple-touch-icon-57x57.png'}),
        rel: 'apple-touch-icon-precomposed',
        sizes: '57x57'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/apple-touch-icon-60x60.png'}),
        rel: 'apple-touch-icon-precomposed',
        sizes: '60x60'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/apple-touch-icon-72x72.png'}),
        rel: 'apple-touch-icon-precomposed',
        sizes: '72x72'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/apple-touch-icon-76x76.png'}),
        rel: 'apple-touch-icon-precomposed',
        sizes: '76x76'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/apple-touch-icon-114x114.png'}),
        rel: 'apple-touch-icon-precomposed',
        sizes: '114x114'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/apple-touch-icon-120x120.png'}),
        rel: 'apple-touch-icon-precomposed',
        sizes: '120x120'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/apple-touch-icon-152x152.png'}),
        rel: 'apple-touch-icon-precomposed',
        sizes: '152x152'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/favicon-196x196.png'}),
        rel: 'icon',
        sizes: '196x196'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/favicon-128x128.png'}),
        rel: 'icon',
        sizes: '128x128'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/favicon-96x96.png'}),
        rel: 'icon',
        sizes: '96x96'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/favicon-32x32.png'}),
        rel: 'icon',
        sizes: '32x32'
      },
      {
        href: urlForStaticAsset({id: '/static/img/favicon/favicon-16x16.png'}),
        rel: 'icon',
        sizes: '16x16'
      }
    ]}
    meta={[
      {content: 'utf-8', name: 'charset'},
      {content: 'width=device-width, initial-scale=1.0', name: 'viewport'},
      {content: themeColor, name: 'theme-color'}
    ]}
    script={[
      {src: urlForTemplateJs(), type: 'text/javascript'}
    ]}
    titleTemplate={titleTemplate}
  />

export {DefaultHeader}
