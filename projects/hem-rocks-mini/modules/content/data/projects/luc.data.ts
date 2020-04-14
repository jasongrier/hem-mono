import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const lucData: IContentItem = {
  badgeText: 'Coming Soon',
  blurb: `
  `,
  date: '01.09.2017',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['projects'],
  name: 'Luc',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'luc',
  sticky: true,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default lucData
