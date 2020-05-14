import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const ascendingSeriesThreeData: IContentItem = {
  acceptingDonations: false,
  blurb: `
  `,
  date: '01.09.2008',
  badgeText: null,
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  flexPriceRecommended: 15,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['label', 'events'],
  name: 'Ascending Series Three',
  nameWrapping: 'Ascend&shy;ing Series Three',
  published: true,
shopifyHandle: '',
  soundCloudTrackId: 'soundCloudTrackId',
  soundCloudSecretToken: null,
  slug: 'ascending-series-three',
  sticky: false,
  trackAttribution: 'PLEASE FILL ME IN',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default ascendingSeriesThreeData
