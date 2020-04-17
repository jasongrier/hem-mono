import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const sweetBeaVinylData: IContentItem = {
  blurb: `
    I'm baby everyday carry kickstarter tilde retro yr shaman letterpress blog gentrify distillery asymmetrical gochujang skateboard bushwick. Mlkshk retro squid, deep v knausgaard pork belly gentrify tote bag health goth. Occupy small batch health goth, blue bottle vaporware master cleanse pok pok kickstarter.
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
  tags: ['sound-library', 'found-sound', 'thrift-store-vinyl', 'sounds-instruments'],
  name: 'Sweet Bea Vinyl',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'sweet-bea-vinyl',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default sweetBeaVinylData
