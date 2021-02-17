import { isEmpty } from 'lodash'
import { IState, hasCategory, IContentItem } from '../index'

function applyPaginationAndFiltering(state: IState) {
  const { adminFilterApplied, page, adminSearchApplied, contentItems, adminSearchableField, adminSearchExact, needsKeyArtFilter, showUnpublishedFilter, stickyFilter } = state

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
      if (adminSearchExact) {
        return item[adminSearchableField] === adminSearchApplied
      }

      else {
        // @ts-ignore
        return item[adminSearchableField]?.includes(adminSearchApplied)
      }
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

  pageContentItems = pageContentItems.filter(item => item.project === state.currentProject)

  pageContentItems.sort((a, b) => {
    return parseInt(a.order, 10) - parseInt(b.order, 10)
  })

  const pageSize = 25
  const pageIndex = (page - 1) * pageSize

  return {
    unpaginatedItemCount: pageContentItems.length,
    pageContentItems: pageContentItems.slice(pageIndex, pageIndex + pageSize - 1)
  }
}

export default applyPaginationAndFiltering
