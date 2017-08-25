import {chokidarAddRemoveFile} from '../utils/chokidar'
import globby from 'globby'
import {pathToId} from '../utils/id'
import {staticAssetPath} from '../../config'

export const staticAssetsCollection = {
  children: async () =>
    globby(['**/*'], {
      cwd: staticAssetPath,
      nodir: true
    }).then((files) =>
      files.map((file) => {
        const childId = pathToId({p: file})
        return {
          id: childId,
          type: 'file'
        }
      })
    ),
  childrenWatcher$: () => chokidarAddRemoveFile(`${staticAssetPath}/**/*`, {ignoreInitial: true}),
  content: async () => ({})
}
