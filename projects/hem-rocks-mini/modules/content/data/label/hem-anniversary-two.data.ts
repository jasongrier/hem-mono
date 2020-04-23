import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

// TODO: Is this the 12 radios show??
const hemAnniversaryTwoData: IContentItem = {
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
  tags: ['label'],
  name: 'HEM Anniversary Two',
  nameWrapping: 'HEM Anni&shy;versary Two',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  soundCloudSecretToken: null,
  slug: 'hem-anniversary-two',
  sticky: false,
  trackAttribution: 'PLEASE FILL ME IN',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default hemAnniversaryTwoData
