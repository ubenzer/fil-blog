import {staticAssetsPath, staticAssetsSubfolder} from '../config'
import {chokidarChangeFile$} from '../utils/chokidar'
import globby from 'globby'
import {pathToIdPart} from '../utils/id'

export const staticAssetsCollection = {
  children: async () =>
    globby(['**/*'], {
      cwd: staticAssetsPath,
      nodir: true
    })
    .then((files) =>
      files.map((file) => {
        const childId = pathToIdPart({p: file})
        return `file@/${staticAssetsSubfolder}/${childId}`
      })
    ),
  childrenWatcher$: () => chokidarChangeFile$(`${staticAssetsPath}/**/*`, {ignoreInitial: true}),
  content: async () => ({})
}
