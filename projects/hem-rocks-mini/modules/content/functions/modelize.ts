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
    labelExternalLinkText: rawContentItem.labelExternalLinkText || '',
    labelExternalLinkUrl: rawContentItem.labelExternalLinkUrl || '',
    labelIsDigitalProduct: rawContentItem.labelIsDigitalProduct || false,
    published: rawContentItem.published || false,
    secondaryTitle: rawContentItem.secondaryTitle || '',
    slug: rawContentItem.slug || '',
    sticky: rawContentItem.sticky || false,
    tags: rawContentItem.tags || '',
    title: rawContentItem.title || '',
    titleWrapping: rawContentItem.titleWrapping || '',
    trackId: rawContentItem.trackId || '',
    type: rawContentItem.type || '',
  }
}

export default modelize