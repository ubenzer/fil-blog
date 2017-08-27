import {chokidarAddRemoveFile} from '../../utils/chokidar'
import fs from 'fs-extra'
import {getFoldersIn} from '../../utils/fs'
import path from 'path'
import {pathToId} from '../../utils/id'
import {postPath} from '../../../config'

export const postCollection = {
  children: async () => {
    const years = await getFoldersIn(postPath)
    const months = (await Promise.all(
      years.map((year) =>
        getFoldersIn(path.join(postPath, year))
          .then((mnts) => mnts.map((m) => ({month: m, year})))
      )
    )).reduce((acc, monthArray) => [...acc, ...monthArray], [])

    const posts = (await Promise.all(
      months.map(({year, month}) =>
        getFoldersIn(path.join(postPath, year, month))
          .then((postIds) => postIds.map((postId) => ({month, postId, year})))
      )
    ))
      .reduce((acc, postArray) => [...acc, ...postArray], [])
      .map(({year, month, postId}) => {
        const p = path.join(postPath, year, month, postId, 'index.md')
        const id = pathToId({p})
        return {id, month, path: p, postId, year}
      })

    const exitingPosts = (await Promise.all(
      posts.map((post) =>
        fs.pathExists(post.path)
          .then((exists) => ({exists, post}))
          .catch(() => ({exists: false, post}))
      )
    )).filter(({exists}) => exists).map(({post}) => post)

    return exitingPosts.map(({id}) => ({id, type: 'post'}))
  },
  childrenWatcher: ({notifyFn}) =>
    chokidarAddRemoveFile(notifyFn, `${postPath}/**/index.md`, {
      depth: 3,
      ignoreInitial: true
    }),
  content: async () => ({})
}
