import cp from "child_process"

const spawn = ({exe, args, cwd, onStderr, onStdout}) => {
  const child = cp.spawn(exe, args, {cwd})
  if (onStdout) {
    child.stdout.on("data", (chunk) => onStdout(chunk.toString()))
  }
  if (onStderr) {
    child.stderr.on("data", (chunk) => onStderr(chunk.toString()))
  }
  return new Promise((resolve, reject) => {
    child.on("close", (code) => {
      if (code) {
        reject(code)
      } else {
        resolve()
      }
    })
  })
}

export {spawn}
