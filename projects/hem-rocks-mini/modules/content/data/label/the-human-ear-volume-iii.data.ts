import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const theHumanEarVolumeIIIData: IContentItem = {
  acceptingDonations: false,
  blurb: `
  `,
  date: '01.09.2017',
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
  name: 'The Human Ear Volume III',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  soundCloudSecretToken: null,
  slug: 'the-human-ear-volume-iii',
  sticky: false,
  trackAttribution: 'PLEASE FILL ME IN',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default theHumanEarVolumeIIIData
