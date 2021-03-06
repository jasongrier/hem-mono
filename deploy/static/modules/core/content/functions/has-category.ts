import { isEmpty } from 'lodash'
import { IContentItem } from '../index'

function hasCategory(item: IContentItem, category: string) {
  if (isEmpty(item.category)) return false
  let categories = item.category.split(',')
  if (!categories.length) return false
  categories = categories.map(t => t.trim())
  return categories.includes(category)
}

export default hasCategory
