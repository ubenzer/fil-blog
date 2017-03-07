import {chokidar$} from "../../utils/chokidar"
import {contentPath} from "../../index"
import {fsPromise} from "../../utils/fs"
import {idToPath} from "../../utils/id"
import path from "path"

export const file = {
  content: async ({id}) => {
    const p = idToPath({id})
    const content = await fsPromise.readFileAsync(path.join(contentPath, p))

    return {content}
  },
  contentWatcher$: ({id}) => chokidar$(path.join(contentPath, idToPath({id})), {ignoreInitial: true})
}
