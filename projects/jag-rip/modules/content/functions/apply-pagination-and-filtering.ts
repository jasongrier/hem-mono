import { find, isEmpty } from 'lodash'
import moment from 'moment'
import { IState, hasCategory, IContentItem } from '../index'
import hasTag from './has-tag'

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

  // pageContentItems = pageContentItems.filter(item => hasTag(item, 'rare') && item.sticky)
  // pageContentItems = pageContentItems.filter(item => !hasTag(item, 'releases'))
  // pageContentItems = pageContentItems.filter(item => !hasTag(item, 'player-playlist'))
  // pageContentItems = pageContentItems.filter(item => !hasTag(item, 'done-for-now'))
  // pageContentItems = pageContentItems.filter(item => !hasTag(item, 'delete-me'))
  // pageContentItems = pageContentItems.filter(item => isEmpty(item.attribution))
  // pageContentItems = pageContentItems.filter(item => !item.secondaryAttribution.includes('Heart Shaped Rock'))
  // pageContentItems = pageContentItems.filter(item => !item.note.includes('Heart Shaped Rock'))
  // pageContentItems = pageContentItems.filter(item => !item.title.includes('Haunted'))
  // pageContentItems = pageContentItems.filter(item => !item.secondaryAttribution.includes('CalArts'))
  // pageContentItems = pageContentItems.filter(item => !item.secondaryAttribution.includes('Clouds'))
  // pageContentItems = pageContentItems.filter(item => !item.secondaryAttribution.includes('Unbekannte'))
  // pageContentItems = pageContentItems.filter(item => !item.secondaryAttribution.includes('Demonstration Disc'))

  // pageContentItems.sort((a, b) => {
  //   if (adminFilterApplied === 'sound-library') {
  //     return parseInt(a.order, 10) - parseInt(b.order, 10)
  //   }

  //   else if (adminFilterApplied === 'tracks') {
  //     return parseInt(a.id, 10) - parseInt(b.id, 10)
  //   }

  //   else {
  //     // @ts-ignore
  //     return moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
  //   }
  // })

  // pageContentItems.sort((a, b) => {
  //   if (a.title > b.title) return 1
  //   if (b.title > a.title) return -1
  //   return 0
  // })

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
