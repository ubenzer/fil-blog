import {cssPath, templatePath} from '../../../config'
import CleanCSS from 'clean-css'
import Promise from 'bluebird'
import {chokidar} from '../../utils/chokidar'
import fs from 'fs-extra'
import path from 'path'
import stylus from 'stylus'

const cleanCss = new CleanCSS({
  inline: ['all'],
  level: {
    1: {specialComments: 0},
    2: {
      all: false,
      removeDuplicateRules: true
    }
  },
  rebase: false,
  returnPromise: true
})
const renderAsync = Promise.promisify(stylus.render)

const styls = {
  content: async () => {
    const p = path.join(cssPath, 'index.styl')
    const strContent = await fs.readFile(p, 'utf8')

    return renderAsync(strContent, {filename: p})
      .then((css) => cleanCss.minify(css))
      .catch((err) => ({styles: JSON.stringify(err)}))
      .then((output) => ({content: output.styles}))
  },
  contentWatcher: ({notifyFn}) =>
    chokidar(notifyFn, [`${cssPath}/**/*.styl`, `${templatePath}/**/*.styl`], {ignoreInitial: true})
}

export {styls as stylus}
