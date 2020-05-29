import { isEmpty } from 'lodash'
import { IContentItem } from '../index'

function getContentItemByField(contentItems: IContentItem[], fieldName: string, fieldValue: string, fieldIsArray: boolean) {
  if (fieldIsArray) {
    return contentItems.filter(item => {
      if (isEmpty(item[fieldName])) return false
      let fieldItems = item[fieldName].split(',')
      fieldItems = fieldItems.map(fieldItem => fieldItem.trim())
      return fieldItems.includes(fieldValue)
    })
  }

  else {
    return contentItems.find(item => item[fieldName] === fieldValue)
  }
}

function getContentItemBySlug(contentItems: IContentItem[], slug: string) {
  return getContentItemByField(contentItems, 'slug', slug, false) as IContentItem
}

function getContentItemsByTag(contentItems: IContentItem[], tag: string) {
  return getContentItemByField(contentItems, 'tag', tag, true) as IContentItem[]
}

export {
  getContentItemByField,
  getContentItemBySlug,
  getContentItemsByTag,
}
