import { IContentItem } from '../index'

function hasCategory(item: IContentItem, category: string) {
  return item.category === category
}

export default hasCategory
