import {idForStaticAsset} from '../utils/id'
import {urlForStaticAsset} from '../utils/url'

const staticAssetHandler = {
  async handle({project, url}) {
    const id = idForStaticAsset({url})
    const value = await project.valueOf({id, type: 'file'})

    return {body: value.content}
  },
  async handles({project}) {
    const {children: staticAssets} = await project.metaOf({id: null, type: 'staticAssetsCollection'})
    return staticAssets.map(({id}) => `/${urlForStaticAsset({id})}`)
  },
  useHandleCache: () => false,
  useHandlesCache: () => false
}
export {staticAssetHandler}
