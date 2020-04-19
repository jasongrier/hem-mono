import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const violaIiData: IContentItem = {
  acceptingDonations: false,
  badgeText: 'Coming Soon',
  blurb: `
    Free for Live 10 users, Singularities makes use of single samples and finely tuned, expressive parameters to capture the sound and feel of classic synths and samplers. Included are 40 Instrument Racks, plus MIDI clips and drum kits – all the parts you need for a complete track.
  `,
  date: '01.07.2020',
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  flexPriceRecommended: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library', 'coming-soon', 'extended-technique', 'asmr', 'instruments', 'microtonality', 'strings'],
  name: 'Viola II',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'viola-ii',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default violaIiData
