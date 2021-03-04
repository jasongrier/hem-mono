import { compact, find } from 'lodash'
import { getContentItemBySlug } from './get-content-item-by-field'
import { IContentItem } from '../index'

function getContentItemsFromList(contentItems: IContentItem[], listSlug: string) {
  const listItem = getContentItemBySlug(contentItems, listSlug)

  if (!listItem) return []

  return getContentItemsFromRawList(contentItems, listItem.attachments)
}

function getContentItemsFromRawList(contentItems: IContentItem[], list: string) {
  const listItemIds = compact(
    list.split('\n').map(id => id.trim())
  )

  return compact(
    listItemIds.map(id => find(contentItems, { id, published: true }))
  )
}

export { getContentItemsFromList, getContentItemsFromRawList }
