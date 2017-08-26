import {chokidarChangeFile} from '../../utils/chokidar'
import {contentPath} from '../../../config'
import fs from 'fs-extra'
import {idToPath} from '../../utils/id'
import path from 'path'

export const file = {
  content: async ({id}) => {
    const p = idToPath({id})
    const content = await fs.readFile(path.join(contentPath, p))

    return {content}
  },
  contentWatcher: ({id, notifyFn}) =>
    chokidarChangeFile(notifyFn, path.join(contentPath, idToPath({id})), {ignoreInitial: true}),
  useContentCache: () => false
}
