import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const gillisGrierBerlinArtPrizeData: IContentItem = {
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
  name: 'Gillis-Grier Berlin Art Prize',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  soundCloudSecretToken: null,
  slug: 'gillis-grier-berlin-art-prize',
  sticky: false,
  trackAttribution: 'PLEASE FILL ME IN',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default gillisGrierBerlinArtPrizeData
