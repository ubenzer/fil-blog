import {defaultHeadersFor} from '../../../fil/app/utils/http'
import {urlForSitemap} from '../utils/url'

const sitemapHandler = {
  async handle({project, url}) {
    const value = await project.valueOf({id: null, type: 'sitemap'})

    return {body: value.content}
  },
  handles: async () => [urlForSitemap()]
}
export {sitemapHandler}
