import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const choirVinylData: IContentItem = {
  acceptingDonations: false,
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
  tags: ['sound-library', 'choral', 'vocal', 'found-sound', 'thrift-store-vinyl'],
  name: 'Choir',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'choir-vinyl',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default choirVinylData
