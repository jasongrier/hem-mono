import { IContentItem } from '../index'

function modelize(rawContentItem: any): IContentItem {
  return {
    acceptingDonations: rawContentItem.acceptingDonations || false,
    attribution: rawContentItem.attribution || '',
    attributionLink: rawContentItem.attributionLink || '',
    badgeText: rawContentItem.badgeText || '',
    blurb: rawContentItem.blurb || '',
    category: rawContentItem.category || '',
    displayCategory: rawContentItem.displayCategory || '',
    date: rawContentItem.date || '',
    description: rawContentItem.description || '',
    externalLinkText: rawContentItem.externalLinkText || '',
    externalLinkUrl: rawContentItem.externalLinkUrl || '',
    fixedPrice: rawContentItem.fixedPrice || '',
    flexPriceMinimum: rawContentItem.flexPriceMinimum || '',
    flexPriceRecommended: rawContentItem.flexPriceRecommended || '',
    hasFixedPrice: rawContentItem.hasFixedPrice || false,
    id: rawContentItem.id || '',
    isDigitalProduct: rawContentItem.isDigitalProduct || false,
    keyArt: rawContentItem.keyArt || '',
    published: rawContentItem.published || false,
    relatedContent: rawContentItem.relatedContent || '',
    relatedContentLink: rawContentItem.relatedContentLink || '',
    secondaryTitle: rawContentItem.secondaryTitle || '',
    slug: rawContentItem.slug || '',
    sticky: rawContentItem.sticky || false,
    tags: rawContentItem.tags || '',
    title: rawContentItem.title || '',
    titleWrapping: rawContentItem.titleWrapping || '',
    trackSlugs: rawContentItem.trackSlugs || '',
    trackResourceId: rawContentItem.trackResourceId || '',
    trackResourceSecret: rawContentItem.trackResourceSecret || '',
    type: rawContentItem.type || '',
  }
}

export default modelize
