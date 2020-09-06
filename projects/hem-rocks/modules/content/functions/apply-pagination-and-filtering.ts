import { isEmpty } from 'lodash'
import moment from 'moment'
import { IState, hasCategory, IContentItem } from '../index'

function applyPaginationAndFiltering(state: IState) {
  const { adminFilterApplied, page, adminSearchApplied, needsKeyArtFilter, showUnpublishedFilter, stickyFilter } = state

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
    pageContentItems = pageContentItems.filter(item =>
      item.tags.includes(adminSearchApplied)
      // item.slug.toLowerCase().includes(adminSearchApplied.toLowerCase())
      // || item.slug.toLowerCase().includes(adminSearchApplied.toLowerCase())
      // || item.tags.toLowerCase().includes(adminSearchApplied.toLowerCase())
      // || item.audioFilename.toLowerCase().includes(adminSearchApplied.toLowerCase())
      // || item.attribution.toLowerCase().includes(adminSearchApplied.toLowerCase())
    )
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

    else {
      // @ts-ignore
      return moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
    }
  })

  return pageContentItems.slice(page - 1, 10)
}

export default applyPaginationAndFiltering
