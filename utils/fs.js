import Promise from "bluebird"
import fs from "fs-extra"
import path from "path"

// noinspection JSUnresolvedFunction
const fsPromise = Promise.promisifyAll(fs)

const getFoldersIn = async (p) => {
  // noinspection JSUnresolvedFunction
  const allFiles = await fsPromise.readdirAsync(p)
  return allFiles.filter((f) => fs.statSync(path.join(p, f)).isDirectory()) // eslint-disable-line no-sync
}

export {getFoldersIn, fsPromise}
