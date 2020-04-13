import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const noiseReductionArtefactsData: IContentItem = {
  badgeText: null,
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
  tags: ['sound-library'],
  name: 'Noise Reduction Artefacts',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'noise-reduction-artefacts',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default noiseReductionArtefactsData
