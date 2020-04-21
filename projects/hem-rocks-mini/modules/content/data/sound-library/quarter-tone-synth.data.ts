import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const quarterToneSynthData: IContentItem = {
  acceptingDonations: false,
  badgeText: 'Coming Soon',
  blurb: `
    Free for Live 10 users, Singularities makes use of single samples and finely tuned, expressive parameters to capture the sound and feel of classic synths and samplers. Included are 40 Instrument Racks, plus MIDI clips and drum kits – all the parts you need for a complete track.
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
  tags: ['sound-library', 'synth', 'instruments', 'microtonality', 'coming-soon'],
  name: 'Quarter Tone Synth',
  published: true,
  soundCloudTrackId: 'soundCloudTrackId',
  trackAttribution: 'HEM Sound Library',
  slug: 'quarter-tone-synth',
  sticky: false,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default quarterToneSynthData
