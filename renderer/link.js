import {isExternalUrl, urlForPost, urlForPostAttachment} from '../utils/url'
import {postIdToAttachmentId} from '../utils/id'
import {postPath} from '../../config'

const POST_LINK_PREFIX = 'post@'

const postUrlGenerator = ({rawUrl}) => {
  const normalizedUrl = `${POST_LINK_PREFIX}${postPath}${rawUrl.substr(POST_LINK_PREFIX.length)}`
  return urlForPost({id: normalizedUrl})
}
const postAttachmentUrlGenerator = ({rawUrl, postId}) => {
  const attachmentId = postIdToAttachmentId({attachmentRelativeUrl: rawUrl, postId})
  return urlForPostAttachment({id: attachmentId})
}

const getRealUrlForMarkdownUrl = ({rawUrl, postId}) => {
  if (rawUrl.startsWith(POST_LINK_PREFIX)) {
    return postUrlGenerator({postId, rawUrl})
  }
  return postAttachmentUrlGenerator({postId, rawUrl})
}

const calculateShouldOpenInNewTab = ({isUrlExternal}) => isUrlExternal

const renderLinkOpen = ({inNewTab, url}) =>
  `<a href="${url}" ${inNewTab ? 'rel="noopener noreferrer" target="_blank"' : ''}>`

export const markdownLinkParser = (md, {postId}) => {
  md.renderer.rules.link_open = (tokens, idx) => { // eslint-disable-line camelcase
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')

    const rawUrl = token.attrs[hrefIndex][1]
    const isUrlExternal = isExternalUrl({url: rawUrl})

    const inNewTab = calculateShouldOpenInNewTab({isUrlExternal})

    if (isUrlExternal) {
      return renderLinkOpen({inNewTab, url: rawUrl})
    }

    const url = getRealUrlForMarkdownUrl({postId, rawUrl})

    return renderLinkOpen({inNewTab, url})
  }
}

