import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const onePitchData: IContentItem = {
  acceptingDonations: false,
  blurb: `
    Free for Live 10 users, Singularities makes use of single samples and finely tuned, expressive parameters to capture the sound and feel of classic synths and samplers. Included are 40 Instrument Racks, plus MIDI clips and drum kits – all the parts you need for a complete track.
  `,
  date: '01.09.2017',
  badgeText: null,
  description: autop(`
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  flexPriceRecommended: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library', 'synth', 'instruments', 'generative-tools', 'midi-devices'],
  name: 'One Pitch',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  slug: 'one-pitch',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default onePitchData
