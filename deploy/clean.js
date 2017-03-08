import debugc from "debug"
import {fsPromise} from "../utils/fs"
import globby from "globby"
import {outPath} from "../config"
import path from "path"

const debug = debugc("fil:site")

/* eslint-disable no-console */
// removes everything but .git from dist
const clean = async () => {
  console.log("Cleaning dist folder...")

  const files = await globby(["*", "!.git/"], {cwd: outPath})

  await Promise.all(files.map((file) => {
    debug(`Removing "${file}"...`)
    return fsPromise.removeAsync(path.join(outPath, file))
  }))
}

export default clean
