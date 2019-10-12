import splitDomString from './split-dom-string'

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
  const parts = splitDomString(subject, position)
  return parts[0] + (content || '') + parts[1]
}

export default spliceDomString
