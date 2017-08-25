import {defaultHeadersFor} from '../../../../fil/app/utils/http'
import {urlForTemplateJs} from '../../utils/url'

const templateJsHandler = {
  async handle({project, url}) {
    const value = await project.valueOf({id: null, type: 'js'})

    return {body: value.content}
  },
  handles: async () => [urlForTemplateJs()]
}
export {templateJsHandler}
