import { compact, map } from 'lodash'
import { getContentItemBySlug } from './get-content-item-by-field'
import { IContentItem } from '../index'

function getContentItemsFromList(contentItems: IContentItem[], listSlug: string) {
  const listItem = getContentItemBySlug(contentItems, listSlug)

  if (!listItem) return []

  return getContentItemsFromRawList(contentItems, listItem.description)
}

function getContentItemsFromRawList(contentItems: IContentItem[], list: string) {
  const listItemSlugs = compact(
    list.split('\n').map(item => item.trim())
  )

  return compact(
    listItemSlugs.map(slug => getContentItemBySlug(contentItems, slug))
  )
}

export { getContentItemsFromList, getContentItemsFromRawList }
