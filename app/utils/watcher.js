import {chokidar} from './chokidar'
import {templatePath} from '../../config'

const templateWatcher = ({notifyFn}) =>
  chokidar(notifyFn, [
    `${templatePath}/**/*.js`,
    'config.js'
  ], {ignoreInitial: true})

const watcherMerge = (...watchers) => ({unsubscribe: () => watchers.forEach((w) => w.unsubscribe())})

export {templateWatcher, watcherMerge}
