import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const antiquePianoData: IContentItem = {
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
  flexPriceRecommended: 15,
  hasFixedPrice: false,
  id: uuid(),
  images: [
    {
      alt: 'HEM Antique Piano',
      src: 'http://static.hem.rocks/hem-rocks/site/sound-library/IMG_8190.JPG',
    }
  ],
  tags: ['sound-library', 'instruments', 'keys', 'donic-detritus'],
  name: 'Antique Piano',
  published: true,
  soundCloudTrackId: '803629816',
  slug: 'antique-piano',
  sticky: false,
  trackAttribution: 'HEM Sound Libraray',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default antiquePianoData
