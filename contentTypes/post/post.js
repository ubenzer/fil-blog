import {chokidar$, chokidarAddRemoveFile$} from '../../utils/chokidar'
import {idToPath, idToType, isPathImage, pathToIdPart} from '../../utils/id'
import fs from 'fs-extra'
import globby from 'globby'
import path from 'path'
import {rawContentToPostObject} from '../../utils/post'

export const post = {
  children: async ({id}) => {
    // Get rid of index.md part.
    const p = path.join(idToPath({id}), '..')

    return globby(['**/*', '!index.md', '!**/.*'], {
      cwd: p,
      nodir: true
    })
    .then((files) =>
      files.map((file) => {
        const childPath = path.join(p, file)
        const childId = pathToIdPart({p: childPath})

        return isPathImage({p: childPath}) ? `image@${childId}` : `file@${childId}`
      })
    )
  },
  childrenWatcher$: ({id}) =>
    chokidarAddRemoveFile$(idToPath({id}), {
      ignoreInitial: true,
      ignored: ['**/.*', path.join(idToPath({id}), 'index.md'), '**/']
    }),
  content: async ({id, project}) => {
    const postAttachments = (await project.metaOf({id})).children
    const imageMetaIds = postAttachments
      .filter((c) => idToType({id: c}) === 'image')
      .map((c) => `imageMeta@${idToPath({id: c})}`)

    const imageMetas = await Promise.all(
      imageMetaIds.map(
        (imageMetaId) => project.valueOf({id: imageMetaId})
      )
    )

    const rawFileContent = await fs.readFile(idToPath({id}), 'utf8')
    const p = await rawContentToPostObject({id, imageMetas, rawFileContent})
    return {id, ...p}
  },
  contentWatcher$: ({id}) => chokidar$(idToPath({id}), {ignoreInitial: true})
}

