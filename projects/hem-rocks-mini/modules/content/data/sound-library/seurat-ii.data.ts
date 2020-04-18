import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const seuratIiData: IContentItem = {
  acceptingDonations: false,
  badgeText: 'Coming Soon',
  blurb: `
    I'm baby everyday carry kickstarter tilde retro yr shaman letterpress blog gentrify distillery asymmetrical gochujang skateboard bushwick. Mlkshk retro squid, deep v knausgaard pork belly gentrify tote bag health goth. Occupy small batch health goth, blue bottle vaporware master cleanse pok pok kickstarter.
  `,
  date: '01.05.2020',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library', 'generative-tools', 'midi-devices', 'coming-soon'],
  name: 'Seurat II',
  published: true,
  soundCloudTrackId: '778088458',
  slug: 'seurat-ii',
  sticky: true,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default seuratIiData
