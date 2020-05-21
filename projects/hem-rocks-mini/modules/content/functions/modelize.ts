import { IContentItem } from '../index'

function modelize(rawContentItem: any): IContentItem {
  return {
    acceptingDonations: rawContentItem.acceptingDonations || false,
    attribution: rawContentItem.attribution || '',
    badgeText: rawContentItem.badgeText || '',
    blurb: rawContentItem.blurb || '',
    date: rawContentItem.date || '',
    description: rawContentItem.description || '',
    fixedPrice: rawContentItem.fixedPrice || '',
    flexPriceMinimum: rawContentItem.flexPriceMinimum || '',
    flexPriceRecommended: rawContentItem.flexPriceRecommended || '',
    name: rawContentItem.name || '',
    nameWrapping: rawContentItem.nameWrapping || '',
    published: rawContentItem.published || false,
    slug: rawContentItem.slug || '',
    sticky: rawContentItem.sticky || false,
    tags: rawContentItem.tags || '',
    tracks: rawContentItem.tags || '',
    type: rawContentItem.type || '',
    userSuggestedPrice: rawContentItem.userSuggestedPrice || '',
  }
}

export default modelize