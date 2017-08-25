import {chokidar, chokidarAddRemoveFile} from '../../utils/chokidar'
import {idToPath, isPathImage, pathToId} from '../../utils/id'
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
    }).then((files) =>
      files.map((file) => {
        const childPath = path.join(p, file)
        const childId = pathToId({p: childPath})

        return {
          id: childId,
          type: isPathImage({p: childPath}) ? 'image' : 'file'
        }
      })
    )
  },
  childrenWatcher$: ({id}) =>
    chokidarAddRemoveFile(idToPath({id}), {
      ignoreInitial: true,
      ignored: ['**/.*', path.join(idToPath({id}), 'index.md'), '**/']
    }),
  content: async ({id, project}) => {
    const postAttachments = (await project.metaOf({id, type: 'post'})).children
    const imageMetaIds = postAttachments.filter(({type}) => type === 'image')

    const imageMetas = await Promise.all(
      imageMetaIds.map(
        ({id: i, type}) => project.valueOf({id: i, type: 'imageMeta'})
      )
    )

    const rawFileContent = await fs.readFile(idToPath({id}), 'utf8')
    const p = await rawContentToPostObject({id, imageMetas, rawFileContent})
    return {id, ...p}
  },
  contentWatcher: ({id, notifyFn}) => chokidar(notifyFn, idToPath({id}), {ignoreInitial: true})
}

