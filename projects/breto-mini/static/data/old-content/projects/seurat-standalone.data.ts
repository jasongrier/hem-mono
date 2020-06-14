import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const seuratStandaloneData: IContentItem = {
  acceptingDonations: true,
  badgeText: 'Coming Soon',
  blurb: `
  `,
  date: '01.09.2017',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  flexPriceRecommended: 15,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['projects', 'desktop-mobile-apps', 'javascript', 'react', 'electron', 'sound', 'composition'],
  name: 'Seurat Standalone',
  nameWrapping: null,
published: true,
shopifyHandle: '',
  soundCloudTrackId: null,
  soundCloudSecretToken: null,
  trackAttribution: '',
  slug: 'seurat-standalone',
  sticky: true,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default seuratStandaloneData
