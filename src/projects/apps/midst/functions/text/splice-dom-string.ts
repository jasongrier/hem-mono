/**
 * Splice content into subject at a given "real" index, ignoring HTML tags.
 * (Only the HTML tags that are used in the app.) If no content is provided,
 * then the character at the given position will be removed.
 *
 * @param position
 * @param subject
 * @param content
 */
function spliceDomString(position: number, subject: string, content?: string) {
  let realPosition = 0
  let inATag = false

  for (let p = 0; p < subject.length; p ++) {
    if (subject[p] === '<') {
      inATag = true
    }

    else if (subject[p] === '>') {
      inATag = false
    }

    if (!inATag) {
      if (realPosition === position) {
        return subject.slice(0, p) + (content || '') + subject.slice(p)
      }
      realPosition ++
    }
  }

  return ''
}

export default spliceDomString
