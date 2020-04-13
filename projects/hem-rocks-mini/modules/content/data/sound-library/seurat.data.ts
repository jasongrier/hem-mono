import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const seuratData: IContentItem = {
  blurb: `
  `,
  date: '01.09.2017',
  badgeText: null,
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library'],
  name: 'Seurat',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'slug',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default seuratData