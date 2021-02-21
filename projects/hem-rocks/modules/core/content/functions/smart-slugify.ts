import { slugify } from 'voca'
import uuid from 'uuid/v1'

const ___PRESERVE_AMPERSAND___ = slugify(uuid().toLowerCase())

function smartSlugify(str: string) {
  return slugify(
    str.replace(/%26/g, ___PRESERVE_AMPERSAND___)
  ).replace(new RegExp(___PRESERVE_AMPERSAND___, 'g'), '%26')
}

export default smartSlugify
