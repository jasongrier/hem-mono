import { isEmpty } from 'lodash'
import { IContentItem } from '../index'

function hasTag(item: IContentItem, tag: string) {
  if (isEmpty(item.tags)) return false
  let tags = item.tags.split(',')
  if (!tags.length) return false
  tags = tags.map(t => t.trim())
  return tags.includes(tag)
}

export default hasTag
