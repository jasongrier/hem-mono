import { isEmpty } from 'lodash'
import moment from 'moment'
import { IState, hasCategory, IContentItem } from '../index'
import hasTag from './has-tag'

function applyPaginationAndFiltering(state: IState) {
  const { adminFilterApplied, page, adminSearchApplied, adminSearchableField, needsKeyArtFilter, showUnpublishedFilter, stickyFilter } = state

  let pageContentItems = ([] as IContentItem[]).concat(
    (
      adminFilterApplied === ''
      || adminFilterApplied === 'all'
      || !adminFilterApplied
    )
      ? state.contentItems
      : state.contentItems.filter(item => {
        return hasCategory(item, adminFilterApplied)
      })
  )

  if (!isEmpty(adminSearchApplied)) {
    pageContentItems = pageContentItems.filter(item => {
      // @ts-ignore
      return item[adminSearchableField]?.includes(adminSearchApplied)
    })
  }

  if (needsKeyArtFilter) {
    pageContentItems = pageContentItems.filter(item => isEmpty(item.keyArt))
  }

  if (!showUnpublishedFilter) {
    pageContentItems = pageContentItems.filter(item => item.published || hasCategory(item, 'assets'))
  }

  if (stickyFilter) {
    pageContentItems = pageContentItems.filter(item => item.sticky)
  }

  pageContentItems.sort((a, b) => {
    if (adminFilterApplied === 'sound-library') {
      return parseInt(a.order, 10) - parseInt(b.order, 10)
    }
    
    else if (adminFilterApplied === 'tracks') {
      return parseInt(a.id, 10) - parseInt(b.id, 10)
    }

    else {
      // @ts-ignore
      return moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
    }
  })

  pageContentItems.sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })

  const pageIndex = (page - 1) * 25

  return {
    unpaginatedItemCount: pageContentItems.length,
    pageContentItems: pageContentItems.slice(pageIndex, pageIndex + 24)
  }
}

export default applyPaginationAndFiltering
