import { IContentItem } from '../index'
import { find, findIndex } from 'lodash'

interface IOrderBucket {
  filter: string
  order: string
}

function fieldIsSerialized(fieldValue: string): boolean {
  return (
    fieldValue.includes(':')
    && fieldValue.includes('|')
  )
}

function getOrder(item: IContentItem, forFilter: string): string {
  if (fieldIsSerialized(item.order)) {
    const orderBuckets = parseSerializedOrderFieldValue(item.order)
    const bucket = find(orderBuckets, { filter: forFilter })

    if (!bucket) {
      throw new Error('Probably a corrupt order field: ' + forFilter + ' in ' + item.title + '.')
    }

    return bucket.order
  }

  else {
    return item.order
  }
}

function parseSerializedOrderFieldValue(orderFieldValue: string): IOrderBucket[] {
  return orderFieldValue.split('|').map(bucket => {
    const [filter, order] = bucket.split(':')
    return ({ filter, order })
  })
}

function updateSerializedOrderFieldValue(fieldValue: string, forFilter: string, newValue: string): string {
  let orderBuckets: IOrderBucket[]

  if (fieldIsSerialized(fieldValue)) {
    const buckets = Array.from(parseSerializedOrderFieldValue(fieldValue))
    const bucketIndex = findIndex(buckets, { filter: forFilter })

    if (bucketIndex === -1) {
      throw new Error('Probably a corrupt order field: ' + forFilter + '.')
    }

    buckets[bucketIndex].order = newValue
    orderBuckets = Array.from(buckets)
  }

  else {
    orderBuckets = [{ filter: forFilter, order: newValue }]
  }

  return orderBuckets.map(({order, filter}) => filter + ':' + order).join('|')
}

function orderSortFnFact(currentFilter: string): (a: IContentItem, b: IContentItem) => number {
  return function orderSortFn(a: IContentItem, b: IContentItem): number {
    let aOrder =  getOrder(a, currentFilter)
    let bOrder =  getOrder(b, currentFilter)

    return parseInt(aOrder, 10) - parseInt(bOrder, 10)
  }
}

export {
  getOrder,
  parseSerializedOrderFieldValue,
  updateSerializedOrderFieldValue,
  orderSortFnFact,
}
