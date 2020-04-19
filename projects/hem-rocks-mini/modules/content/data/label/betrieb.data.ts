import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const betriebData: IContentItem = {
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
  flexPriceRecommended: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['label'],
  name: 'Betrieb',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'betrieb',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default betriebData
