import {templateWatcher, watcherMerge} from '../../utils/watcher'
import React from 'react'
import path from 'path'
import {post as postType} from '../../contentTypes/post/post'
import {render} from '../../utils/template'
import {requireUncached} from '../../utils/require'
import {templatePath} from '../../../config'

const aboutMePageHandler = {
  async handle({project, url}) {
    const post = await project.valueOf({id: 'contents/page/about-me.md', type: 'post'})

    const Template = requireUncached(path.join(process.cwd(), templatePath, 'aboutMe')).default
    const str = render({jsx: <Template bodyText={post.htmlContent} url={url} />})

    return {body: str}
  },
  handleWatcher: ({notifyFn}) => watcherMerge(
    postType.contentWatcher({id: 'contents/page/hakkimda.md', notifyFn}),
    templateWatcher({notifyFn})
  ),
  handles: async () => ['/hakkimda/']
}
export {aboutMePageHandler}
