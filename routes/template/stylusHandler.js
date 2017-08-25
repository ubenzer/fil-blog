import {defaultHeadersFor} from '../../../../fil/app/utils/http'
import {urlForTemplateStylus} from '../../utils/url'

const templateStylusHandler = {
  async handle({project, url}) {
    const value = await project.valueOf({id: null, type: 'stylus'})

    return {body: value.content}
  },
  handles: async () => [urlForTemplateStylus()]
}
export {templateStylusHandler}
