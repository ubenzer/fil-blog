import chokidar from 'chokidar'

const startWatching = ({notifyFn, events, args}) => {
  const watcher = chokidar.watch.apply(null, args)
  events.forEach((e) => {
    watcher.on(e, () => {
      notifyFn()
    })
  })

  return {unsubscribe: () => watcher.close()}
}

const chokidarAll = (notifyFn, ...chokidarArgs) =>
  startWatching({args: chokidarArgs, events: ['all'], notifyFn})

const chokidarAddRemoveFile = (notifyFn, ...chokidarArgs) =>
  startWatching({args: chokidarArgs, events: ['add', 'unlink'], notifyFn})

const chokidarChangeFile = (notifyFn, ...chokidarArgs) =>
  startWatching({args: chokidarArgs, events: ['change'], notifyFn})

export {chokidarAll as chokidar, chokidarAddRemoveFile, chokidarChangeFile}
