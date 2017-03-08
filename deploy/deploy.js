import {addAll, commit, push} from "./git"
import {fsPromise} from "../utils/fs"
import moment from "moment"
import {outPath} from "./config"
import path from "path"

/* eslint-disable no-console */

// commit all changes in dist to git
// push
const deploy = async () => {
  console.log("Deploying...")
  const deployDate = moment().format()
  const message = `Fil-deploy at ${deployDate} 🙌`

  await fsPromise.writeFileAsync(path.join(outPath, ".fildeploy.txt"), deployDate)
  await addAll()
  await commit({message})
  await push()
}

export default deploy
