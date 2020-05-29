import { isEmpty } from 'lodash'
import { IContentItem } from '../index'

function getContentItemByField(contentItems: IContentItem[], fieldName: string, fieldValue: string, fieldIsArray) {
  return contentItems.filter(item => {
    if (isEmpty(item[fieldName])) return false

    if (fieldIsArray) {
      let fieldItems = item[fieldName].split(',')
      fieldItems = fieldItems.map(fieldItem => fieldItem.trim())
      return fieldItems.includes(fieldValue)
    }

    else {
      return item[fieldName] === fieldValue
    }
  })
}

function getContentItemBySlug(contentItems: IContentItem[], slug: string) {
  const items = getContentItemByField(contentItems, 'slug', slug, false)

  if (items.length > 1) console.error(`Uh oh! There is more than one item having the slug ${slug}.`)

  return contentItems[0]
}

function getContentItemsByTag(contentItems: IContentItem[], tag: string) {
  return getContentItemByField(contentItems, 'tag', tag, true)
}

export {
  getContentItemByField,
  getContentItemBySlug,
  getContentItemsByTag,
}
