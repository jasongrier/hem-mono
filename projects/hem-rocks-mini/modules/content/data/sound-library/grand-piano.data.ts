import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const grandPianoData: IContentItem = {
  blurb: `
  `,
  date: '01.06.2020',
  badgeText: 'New in the Library',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library'],
  name: 'Grand Piano',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'grand-piano',
  sticky: true,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default grandPianoData
