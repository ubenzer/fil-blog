import babel from 'rollup-plugin-babel'
import {chokidar} from '../../utils/chokidar'
import commonjs from 'rollup-plugin-commonjs'
import {jsPath} from '../../../config'
import nodeResolve from 'rollup-plugin-node-resolve'
import path from 'path'
import {rollup} from 'rollup'

const js = {
  content: async () => {
    const p = path.join(jsPath, 'index.js')

    return rollup({
      input: p,
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
    })
      .then((bundle) => bundle.generate({format: 'iife'}))
      .then((generated) => {
        const code = generated.code
        return {content: code}
      })
  },
  contentWatcher$: () => chokidar(`${jsPath}/**/*.js`, {ignoreInitial: true})
}

export {js}
