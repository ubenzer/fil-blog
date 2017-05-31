import React from 'react'
import {defaultHeadersFor} from '../../utils/http'
import path from 'path'
import {render} from '../../utils/template'
import {requireUncached} from '../../utils/require'
import {templatePath} from '../../../config'

const aboutMePageHandler = {
  async handle({project, url}) {
    const post = await project.valueOf({id: 'post@contents/page/hakkimda.md'})

    const Template = requireUncached(path.join(process.cwd(), templatePath, 'aboutMe')).default
    const str = render({jsx: <Template bodyText={post.htmlContent} url={url} />})

    return {
      body: str,
      headers: defaultHeadersFor({url: `${url}/index.html`})
    }
  },
  handles: async () => ['/hakkimda/']
}
export {aboutMePageHandler}
