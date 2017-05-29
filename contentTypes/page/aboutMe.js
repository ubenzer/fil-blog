import {chokidar$} from '../../utils/chokidar'
import fs from 'fs-extra'
import {pagePath} from '../../../config'
import path from 'path'
import {rawContentToPostObject} from '../../utils/post'

const PAGE = 'about-me.md'

export const aboutMePage = {
  content: async () => {
    const rawFileContent = await fs.readFile(path.join(pagePath, PAGE), 'utf8')
    const p = await rawContentToPostObject({id, imageMetas, rawFileContent, scaledImageIds})
    return {id, ...p}
  },
  contentWatcher$: () => chokidar$(path.join(pagePath, PAGE), {ignoreInitial: true})
}

