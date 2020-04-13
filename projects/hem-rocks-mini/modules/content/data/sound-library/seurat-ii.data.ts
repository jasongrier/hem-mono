import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const seuratIiData: IContentItem = {
  blurb: `
  `,
  date: '01.07.2020',
  badgeText: 'Coming Soon',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library'],
  name: 'Seurat II',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'seurat-ii',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default seuratIiData
