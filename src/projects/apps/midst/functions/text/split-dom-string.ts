/**
 * Split at a given "real" index, ignoring HTML tags. (Only the HTML tags
 * that are used in the app.) If no content is provided, then the character
 * at the given position will be removed.
 *
 * @param position
 * @param subject
 * @param content
 */
function splitDomString(subject: string, position: number) {
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
          return [
            subject.slice(0, p),
            subject.slice(p),
          ]
        }
        realPosition ++
      }
    }

    return ''
  }

  export default splitDomString
