import hasher from 'folder-hash'
import path from 'path'

export const hashOf = async ({p}) => {
  const absolutePath = path.resolve(p)
  return hasher.hashElement(absolutePath, {
    excludes: ['.*', 'cache', 'dist', 'node_modules'],
    match: {
      basename: true,
      path: false
    }
  })
  .then((hashData) => hashData.hash)
}

