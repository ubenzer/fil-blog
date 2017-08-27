import ultimatePagination, {ITEM_TYPES} from 'ultimate-pagination'
import {Button} from './Button'
import PropTypes from 'prop-types'
import React from 'react'
import {urlForStaticAsset} from '../../../app/utils/url'

const getClassName = ({type, isActive}) => {
  if (type === ITEM_TYPES.ELLIPSIS) {
    return 'pagination__ellipsis'
  }
  if (type === ITEM_TYPES.PAGE && !isActive) {
    return 'pagination__page'
  }
  return null
}

const isDisabled = ({type, isActive}) => {
  if (type === ITEM_TYPES.FIRST_PAGE_LINK && isActive) {
    return true
  }
  if (type === ITEM_TYPES.PREVIOUS_PAGE_LINK && isActive) {
    return true
  }
  if (type === ITEM_TYPES.NEXT_PAGE_LINK && isActive) {
    return true
  }
  // noinspection RedundantIfStatementJS
  if (type === ITEM_TYPES.LAST_PAGE_LINK && isActive) {
    return true
  }
  return false
}

const getText = ({type, value}) => {
  if (type === ITEM_TYPES.PAGE) {
    return value.toString()
  }
  return ''
}

const getIcon = ({isActive, type}) => {
  if (type === ITEM_TYPES.FIRST_PAGE_LINK) {
    return urlForStaticAsset({id: '/img/ic_first_page_black_24px.svg'})
  }
  if (type === ITEM_TYPES.PREVIOUS_PAGE_LINK) {
    return urlForStaticAsset({id: '/img/ic_chevron_left_black_24px.svg'})
  }
  if (type === ITEM_TYPES.NEXT_PAGE_LINK) {
    if (isActive) {
      return urlForStaticAsset({id: '/img/ic_chevron_right_black_24px.svg'})
    }
    return urlForStaticAsset({id: '/img/ic_chevron_right_white_24px.svg'})
  }
  if (type === ITEM_TYPES.LAST_PAGE_LINK) {
    return urlForStaticAsset({id: '/img/ic_last_page_black_24px.svg'})
  }
  return null
}

const getStyle = ({isActive, type}) => {
  if (type === ITEM_TYPES.NEXT_PAGE_LINK) {
    return 'primary'
  }
  if (type === ITEM_TYPES.PAGE && isActive) {
    return 'flat-accent'
  }
  return 'flat'
}

const renderLis = ({pageUrlFn, paginationModel}) =>
  paginationModel.map(({key, value, type, isActive}) =>
    <li className={getClassName({type})} key={key}>
      {type === ITEM_TYPES.ELLIPSIS &&
      <img src={urlForStaticAsset({id: '/img/ic_more_horiz_black_24px.svg'})} />
      }
      {(type === ITEM_TYPES.PREVIOUS_PAGE_LINK ||
        type === ITEM_TYPES.PAGE ||
        type === ITEM_TYPES.NEXT_PAGE_LINK ||
        type === ITEM_TYPES.LAST_PAGE_LINK ||
        type === ITEM_TYPES.FIRST_PAGE_LINK
      ) &&
      <Button
        icon={getIcon({isActive, type})}
        isDisabled={isDisabled({isActive, type})}
        style={getStyle({isActive, type})}
        text={getText({type, value})}
        url={pageUrlFn({page: value - 1})}
      />}
    </li>
  )

const createDesktopPagination = ({totalPages, currentPage, pageUrlFn}) => {
  const paginationModel = ultimatePagination.getPaginationModel({currentPage, totalPages})

  const liEls = renderLis({pageUrlFn, paginationModel})
  return (
    <ul className="pagination__large-navigation">
      {liEls}
    </ul>
  )
}

const createMobilePagination = ({totalPages, currentPage, pageUrlFn}) => {
  const paginationModel = ultimatePagination.getPaginationModel({currentPage, totalPages})

  const navigationArrows = paginationModel.filter(({type}) =>
    type === ITEM_TYPES.FIRST_PAGE_LINK ||
    type === ITEM_TYPES.PREVIOUS_PAGE_LINK ||
    type === ITEM_TYPES.NEXT_PAGE_LINK ||
    type === ITEM_TYPES.LAST_PAGE_LINK
  )
  const navigationArrowEls = renderLis({pageUrlFn, paginationModel: navigationArrows})

  const navigationPages = paginationModel.filter(({type}) =>
    type === ITEM_TYPES.PAGE ||
    type === ITEM_TYPES.ELLIPSIS
  )
  const navigationPagesEls = renderLis({pageUrlFn, paginationModel: navigationPages})

  return (
    <div>
      <ul className="pagination__mobile-navigation">
        {navigationArrowEls}
      </ul>
      <ul className="pagination__mobile-navigation">
        {navigationPagesEls}
      </ul>
    </div>
  )
}

const Pagination = ({totalPages, currentPage, pageUrlFn}) =>
  <div className="pagination">
    {createDesktopPagination({currentPage, pageUrlFn, totalPages})}
    {createMobilePagination({currentPage, pageUrlFn, totalPages})}
  </div>

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageUrlFn: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
}

export {Pagination}
