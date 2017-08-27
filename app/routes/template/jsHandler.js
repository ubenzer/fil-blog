import {urlForTemplateJs} from '../../utils/url'

const templateJsHandler = {
  async handle({project}) {
    const value = await project.valueOf({id: null, type: 'js'})

    return {body: value.content}
  },
  handles: async () => [urlForTemplateJs()],
  useHandleCache: () => false,
  useHandlesCache: () => false
}
export {templateJsHandler}
