import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const violaIiData: IContentItem = {
  badgeText: 'Coming Soon',
  blurb: `
  `,
  date: '01.07.2020',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library'],
  name: 'Viola II',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'viola-ii',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default violaIiData
