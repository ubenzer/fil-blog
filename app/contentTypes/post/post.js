import {chokidar$, chokidarAddRemoveFile$} from '../../utils/chokidar'
import {idToPath, idToType, isPathImage, pathToIdPart} from '../../utils/id'
import {postPath, postSymbol} from '../../../config'
import fs from 'fs-extra'
import globby from 'globby'
import path from 'path'
import {rawContentToPostObject} from '../../utils/post'

export const post = {
  children: async ({id}) => {
    const p = idToPath({id})

    return globby(['**/*', '!index.md', '!**/.*'], {
      cwd: path.join(postPath, p),
      nodir: true
    })
    .then((files) =>
      files.map((file) => {
        const childPath = path.join(p, file)
        const childId = pathToIdPart({p: childPath})

        return isPathImage({p: childPath}) ? `image@/${postSymbol}${childId}` : `file@/${postSymbol}${childId}`
      })
    )
  },
  childrenWatcher$: ({id}) =>
    chokidarAddRemoveFile$(path.join(postPath, idToPath({id})), {
      ignoreInitial: true,
      ignored: ['**/.*', path.join(postPath, idToPath({id}), 'index.md'), '**/']
    }),
  content: async ({id, imageMetas, scaledImageIds}) => {
    const rawFileContent = await fs.readFile(path.join(postPath, idToPath({id}), 'index.md'), 'utf8')
    const p = await rawContentToPostObject({id, imageMetas, rawFileContent, scaledImageIds})
    return {id, ...p}
  },
  contentArguments: async ({id, project}) => {
    const postAttachments = (await project.metaOf({id})).children
    const imageIds = postAttachments.filter((c) => idToType({id: c}) === 'image')

    const scaledImageIds = (await Promise.all(imageIds.map((imageId) =>
      project.metaOf({id: imageId}).then((meta) => meta.children))))
      .reduce((acc, scaledImagesArray) => [...acc, ...scaledImagesArray], [])

    const imageMetas = await Promise.all(imageIds.map((imageId) =>
        project.valueOf({id: imageId}).then((content) => ({id: imageId, meta: content.meta}))
    ))
    return {id, imageMetas, scaledImageIds}
  },
  contentWatcher$: ({id}) => chokidar$(path.join(postPath, idToPath({id}), 'index.md'), {ignoreInitial: true})
}
