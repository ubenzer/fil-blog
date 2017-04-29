import fs from 'fs-extra'
import path from 'path'

const getFoldersIn = async (p) => {
  const allFiles = await fs.readdir(p)
  return allFiles.filter((f) => fs.statSync(path.join(p, f)).isDirectory()) // eslint-disable-line no-sync
}

export {getFoldersIn}
