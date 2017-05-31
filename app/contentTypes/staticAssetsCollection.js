import {chokidarAddRemoveFile$} from '../utils/chokidar'
import globby from 'globby'
import {pathToIdPart} from '../utils/id'
import {staticAssetPath} from '../../config'

export const staticAssetsCollection = {
  children: async () =>
    globby(['**/*'], {
      cwd: staticAssetPath,
      nodir: true
    })
    .then((files) =>
      files.map((file) => {
        const childId = pathToIdPart({p: file})
        return `file@/${childId}`
      })
    ),
  childrenWatcher$: () => chokidarAddRemoveFile$(`${staticAssetPath}/**/*`, {ignoreInitial: true}),
  content: async () => ({})
}
