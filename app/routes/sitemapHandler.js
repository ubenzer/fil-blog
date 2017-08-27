import {urlForSitemap} from '../utils/url'

const sitemapHandler = {
  async handle({project}) {
    const value = await project.valueOf({id: null, type: 'sitemap'})

    return {body: value.content}
  },
  handles: async () => [urlForSitemap()],
  useHandleCache: () => false,
  useHandlesCache: () => false
}
export {sitemapHandler}
