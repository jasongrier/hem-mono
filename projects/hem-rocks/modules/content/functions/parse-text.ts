import marked from 'marked'
import Mustache from 'mustache'

function parseText(rawText: string, variables?: any) {
  return marked(
    Mustache.render(rawText, variables)
  )
}

export default parseText
