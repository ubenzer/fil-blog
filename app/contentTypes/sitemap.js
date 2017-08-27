import {urlForPost, urlForPostAttachment} from '../utils/url'
import {baseUrl} from '../../config'
import moment from 'moment/moment'
import sitemap from 'sitemap'

const generateSitemap = ({posts}) => {
  const twoWeeksAgo = moment().subtract(15, 'days')
  const urls = posts.map((post) => {
    const isContentOld = moment(post.editDate).isBefore(twoWeeksAgo)
    const imagesOfContent = post.postImageIds.map(({id, type}) => `${baseUrl}${urlForPostAttachment({id, type})}`)

    return {
      changefreq: isContentOld ? 'monthly' : 'weekly',
      img: imagesOfContent,
      lastmodISO: post.editDate.toISOString(),
      priority: isContentOld ? 0.6 : 0.8,
      url: `${baseUrl}${urlForPost({id: post.id})}`
    }
  })
  const sitemapSkeleton = {urls}
  const sm = sitemap.createSitemap(sitemapSkeleton)
  return sm.toString()
}

const sitemp = {
  content: async ({project}) => {
    const {children: postIds} = await project.metaOf({id: null, type: 'postCollection'})
    const posts = await Promise.all(
      postIds.map(({id, type}) => Promise.all([
        project.valueOf({id, type}),
        project.metaOf({id, type})
      ])
        .then(([postContent, postMeta]) => {
          const postImageIds = postMeta.children.filter(({type: t}) => t === 'image')
          return {postContent, postImageIds}
        })
        .then(({postContent, postImageIds}) => ({
          editDate: postContent.editDate,
          id,
          postImageIds,
          type
        }))
      ))

    const map = generateSitemap({posts})
    return {content: map}
  }
}

export {sitemp as sitemap}
