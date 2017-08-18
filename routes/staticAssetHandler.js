import {defaultHeadersFor} from '../utils/http'
import {idForStaticAsset} from '../utils/id'
import {urlForStaticAsset} from '../utils/url'

const staticAssetHandler = {
  async handle({project, url}) {
    const id = idForStaticAsset({url})
    const value = await project.valueOf({id})

    return {
      body: value.content,
      headers: defaultHeadersFor({url})
    }
  },
  async handles({project}) {
    const {children: staticAssets} = await project.metaOf({id: 'staticAssetsCollection'})
    return staticAssets.map((id) => urlForStaticAsset({id}))
  }
}
export {staticAssetHandler}
