import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const lucData: IContentItem = {
  acceptingDonations: true,
  badgeText: 'Coming Soon',
  blurb: `
  `,
  date: '01.09.2017',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  flexPriceRecommended: 15,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['projects', 'desktop-mobile-apps', 'javascript', 'react', 'electron', 'sound', 'composition'],
  name: 'Luc',
  nameWrapping: null,
published: true,
  soundCloudTrackId: null,
soundCloudSecretToken: null,
  slug: 'luc',
  sticky: true,
  trackAttribution: 'PLEASE FILL ME IN',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default lucData
