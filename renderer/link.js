import {isExternalUrl, urlForPostAttachment} from '../utils/url'
import {postIdToAttachmentId} from '../utils/id'

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

    const attachmentId = postIdToAttachmentId({attachmentRelativeUrl: rawUrl, postId})
    const url = urlForPostAttachment({id: attachmentId})

    return renderLinkOpen({inNewTab, url})
  }
}

