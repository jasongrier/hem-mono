import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const trauermusikData: IContentItem = {
  acceptingDonations: false,
  blurb: `
  `,
  date: '01.09.2009',
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
  name: 'Trauermusik',
  nameWrapping: 'Trauer&shy;musik',
  published: true,
shopifyHandle: '',
  soundCloudTrackId: 'soundCloudTrackId',
  soundCloudSecretToken: null,
  slug: 'trauermusik',
  sticky: false,
  trackAttribution: 'PLEASE FILL ME IN',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default trauermusikData