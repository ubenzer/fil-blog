import {addAll, clone, pull, reset} from "./git"
import debugc from "debug"
import {fsPromise} from "../utils/fs"
import {outPath} from "../config"
import path from "path"

const debug = debugc("fil:site")

/* eslint-disable no-console */

// checks if dist folder has .git repo, if not clones it
// resets all changes
// pulls latest changes from remote
const sync = async () => {
  console.log("Syncing remote repo into local...")
  const gitDirectory = path.join(outPath, ".git")

  const hasGit = await fsPromise.accessAsync(gitDirectory, fsPromise.constants.W_OK)
    .then(() => true)
    .catch(() => false)

  debug(`Has git? ${hasGit}`)

  if (!hasGit) {
    console.log("Removing everything in dist folder...")
    await fsPromise.emptyDirAsync(outPath)
    await clone()
  }

  await addAll()
  await reset()
  await pull()
}

export default sync
