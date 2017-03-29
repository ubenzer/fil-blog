import {defaultHeadersFor} from "../utils/http"
import {urlForTemplateJs} from "../utils/url"

const templateJsHandler = {
  async handle({project, url}) {
    const value = await project.valueOf({id: "js"})

    return {
      body: value.content,
      headers: defaultHeadersFor({url})
    }
  },
  handles: async () => [urlForTemplateJs()]
}
export {templateJsHandler}
