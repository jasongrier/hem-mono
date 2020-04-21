import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const seuratIiData: IContentItem = {
  acceptingDonations: false,
  badgeText: 'Coming Soon',
  blurb: `
    Free for Live 10 users, Singularities makes use of single samples and finely tuned, expressive parameters to capture the sound and feel of classic synths and samplers. Included are 40 Instrument Racks, plus MIDI clips and drum kits – all the parts you need for a complete track.
  `,
  date: '01.05.2020',
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
      alt: 'HEM Seurat II',
      src: 'http://static.hem.rocks/hem-rocks/site/sound-library/s.png',
    }
  ],
  tags: ['sound-library', 'generative-tools', 'midi-devices', 'coming-soon'],
  name: 'Seurat II',
  published: true,
  soundCloudTrackId: '778088458',
  slug: 'seurat-ii',
  sticky: true,
  trackAttribution: 'HEM Sound Library',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default seuratIiData
