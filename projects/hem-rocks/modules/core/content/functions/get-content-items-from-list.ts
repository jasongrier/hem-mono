import { compact, find } from 'lodash'
import { getContentItemBySlug } from './get-content-item-by-field'
import { IContentItem } from '../index'
import { hasTag } from './csv-list-fields'
import { orderSortFnFact } from './parse-serialized-order-field-value'
import { hasCategory, hasProperty } from '../functions'
import { getReleasePhase } from '../../app'

function getContentItemsFromList(contentItems: IContentItem[], listSlug: string, currentProject: string) {
  const listItem = getContentItemBySlug(contentItems, listSlug)

  if (!listItem) return []
  if (!currentProject) return []

  if (listItem.attachments.indexOf('Filter: ') === 0) {
    const spec = listItem.attachments.split('Filter: ').pop()

    if (!spec) return []

    const [category, tag] = spec.split(', ')
    const releasePhase = getReleasePhase(currentProject)
    const items = Array.from(contentItems.filter(i => (
      hasCategory(i, category)
      && hasTag(i, tag)
      && i.project === currentProject
      && !hasProperty(i, 'hide-from-lists')
      && i.published
      && parseInt(i.releasePhase, 10) <= releasePhase
    )))

    items.sort(orderSortFnFact(tag))

    return items
  }

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
