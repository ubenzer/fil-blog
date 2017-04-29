import PropTypes from 'prop-types'

export const blogPostPropType = PropTypes.shape({
  createDate: PropTypes.instanceOf(Date).isRequired,
  htmlContent: PropTypes.string.isRequired,
  htmlExcerpt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
})
