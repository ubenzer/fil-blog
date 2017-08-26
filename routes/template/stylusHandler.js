import {urlForTemplateStylus} from '../../utils/url'

const templateStylusHandler = {
  async handle({project}) {
    const value = await project.valueOf({id: null, type: 'stylus'})

    return {body: value.content}
  },
  handles: async () => [urlForTemplateStylus()],
  useHandleCache: () => false,
  useHandlesCache: () => false
}
export {templateStylusHandler}
