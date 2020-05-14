import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const midstData: IContentItem = {
  acceptingDonations: true,
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
  tags: ['projects', 'desktop-mobile-apps', 'javascript', 'react', 'electron', 'expanded-poetics'],
  name: 'Midst',
  nameWrapping: null,
published: true,
shopifyHandle: '',
  soundCloudTrackId: null,
soundCloudSecretToken: null,
  slug: 'midst',
  sticky: false,
  trackAttribution: 'PLEASE FILL ME IN',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default midstData
