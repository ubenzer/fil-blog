import CleanCSS from 'clean-css'
import Promise from 'bluebird'
import {chokidar$} from '../../utils/chokidar'
import {fsPromise} from '../../utils/fs'
import path from 'path'
import stylus from 'stylus'
import {templatePath} from '../../config'

const cleanCss = new CleanCSS({
  inline: ['remote'],
  level: {
    2: {
      all: false,
      removeDuplicateRules: true
    }
  }
})
const renderAsync = Promise.promisify(stylus.render)
cleanCss.minifyAsync = Promise.promisify(cleanCss.minify)

const styls = {
  content: async () => {
    const p = path.join(templatePath, 'index.styl')
    const strContent = await fsPromise.readFileAsync(p, 'utf8')

    return renderAsync(strContent, {filename: p})
      .then((css) => cleanCss.minifyAsync(css))
      .then((output) => ({content: output.styles}))
  },
  contentWatcher$: () => chokidar$(`${templatePath}/**/*.styl`, {ignoreInitial: true})
}

export {styls as stylus}
