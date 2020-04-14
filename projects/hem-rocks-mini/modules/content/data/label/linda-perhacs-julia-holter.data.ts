import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const lindaPerhacsJuliaHolter: IContentItem = {
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
  tags: ['label'],
  name: 'Linda Perhacs Julia Holter',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'linda-perhacs-julia-holter',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default lindaPerhacsJuliaHolter
