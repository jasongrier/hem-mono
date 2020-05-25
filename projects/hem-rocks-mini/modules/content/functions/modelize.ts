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
    hasFixedPrice: rawContentItem.hasFixedPrice || false,
    secondaryTitle: rawContentItem.secondaryTitle || '',
    title: rawContentItem.title || '',
    titleWrapping: rawContentItem.titleWrapping || '',
    published: rawContentItem.published || false,
    slug: rawContentItem.slug || '',
    sticky: rawContentItem.sticky || false,
    tags: rawContentItem.tags || '',
    trackId: rawContentItem.trackId || '',
    type: rawContentItem.type || '',
  }
}

export default modelize