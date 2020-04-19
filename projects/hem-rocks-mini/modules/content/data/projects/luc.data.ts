import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const lucData: IContentItem = {
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
  flexPriceRecommended: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['projects', 'desktop-mobile-apps', 'javascript', 'react', 'electron', 'sound', 'composition'],
  name: 'Luc',
  published: true,
  soundCloudTrackId: null,
  slug: 'luc',
  sticky: true,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default lucData
