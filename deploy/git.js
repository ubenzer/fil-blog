import {outPath, remoteRepoUrl} from "./config"
import path from "path"
import {spawn} from "../utils/spawn"

/* eslint-disable no-console */

const clone = async () => {
  console.log("Cloning remote repo...")
  return spawn({
    args: ["clone", remoteRepoUrl, "."],
    cwd: path.join(process.cwd(), outPath),
    exe: "git",
    onStderr: console.error,
    onStdout: console.log
  })
}

const commit = async ({message}) => {
  console.log("Committing...")
  return spawn({
    args: ["commit", "-m", message],
    cwd: path.join(process.cwd(), outPath),
    exe: "git",
    onStderr: console.error,
    onStdout: console.log
  })
}

const addAll = async () => {
  console.log("Staging all changes...")
  return spawn({
    args: ["add", "*"],
    cwd: path.join(process.cwd(), outPath),
    exe: "git",
    onStderr: console.error,
    onStdout: console.log
  })
}

const reset = async () => {
  console.log("Resetting local changes...")
  return spawn({
    args: ["reset", "--hard"],
    cwd: path.join(process.cwd(), outPath),
    exe: "git",
    onStderr: console.error,
    onStdout: console.log
  })
}

const pull = async () => {
  console.log("Pulling latest remote...")
  return spawn({
    args: ["pull"],
    cwd: path.join(process.cwd(), outPath),
    exe: "git",
    onStderr: console.error,
    onStdout: console.log
  })
}

const push = async () => {
  console.log("Pushing to remote...")
  return spawn({
    args: ["push"],
    cwd: path.join(process.cwd(), outPath),
    exe: "git",
    onStderr: console.error,
    onStdout: console.log
  })
}

export {commit, clone, addAll, reset, pull, push}
