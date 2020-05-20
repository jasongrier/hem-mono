import { IContentItem, IImage, ITrack } from '../index'

function imageize(rawImage: any): IImage {
  return {
    alt: rawImage.alt,
    src: rawImage.src,
  }
}

function trackize(rawTrack: any): ITrack {
  return {
    attribution: rawTrack.attribution,
    type: rawTrack.type,
    soundCloudTrackId: rawTrack.soundCloudTrackId,
    soundCloudSecretToken: rawTrack.soundCloudSecretToken,
  }
}

function modelize(rawContentItem: any): IContentItem {
  return {
    acceptingDonations: rawContentItem.acceptingDonations || false,
    badgeText: rawContentItem.badgeText || '',
    blurb: rawContentItem.blurb || '',
    date: rawContentItem.date || '',
    description: rawContentItem.description || '',
    fixedPrice: rawContentItem.fixedPrice || '',
    flexPriceMinimum: rawContentItem.flexPriceMinimum || '',
    flexPriceRecommended: rawContentItem.flexPriceRecommended || '',
    keyArt: rawContentItem.keyArt || '',
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