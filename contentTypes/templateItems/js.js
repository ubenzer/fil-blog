import babel from 'rollup-plugin-babel'
import {chokidar$} from '../../utils/chokidar'
import commonjs from 'rollup-plugin-commonjs'
import {frontendJsPath} from '../../config'
import nodeResolve from 'rollup-plugin-node-resolve'
import path from 'path'
import {rollup} from 'rollup'

const js = {
  content: async () => {
    const p = path.join(frontendJsPath, 'index.js')

    return rollup({
      entry: p,
      plugins: [
        nodeResolve({
          jsnext: true,
          main: true
        }),
        commonjs(),
        babel({
          babelrc: false,
          exclude: 'node_modules/**',
          plugins: ['external-helpers'],
          presets: [['es2015', {modules: false}]]
        })
      ]
    }).then((bundle) => {
      const generated = bundle.generate({format: 'iife'})

      const code = generated.code
      return {content: code}
    })
  },
  contentWatcher$: () => chokidar$(`${frontendJsPath}/**/*.js`, {ignoreInitial: true})
}

export {js}
