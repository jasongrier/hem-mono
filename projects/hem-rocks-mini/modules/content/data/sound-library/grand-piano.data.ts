import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
// @ts-ignore
import autop from 'lines-to-paragraphs'

const grandPianoData: IContentItem = {
  acceptingDonations: false,
  blurb: `
    Free for Live 10 users, Singularities makes use of single samples and finely tuned, expressive parameters to capture the sound and feel of classic synths and samplers. Included are 40 Instrument Racks, plus MIDI clips and drum kits – all the parts you need for a complete track.
  `,
  date: '01.09.2020',
  badgeText: 'New in the Library',
  description: autop(`
    I'm baby beard fashion axe plaid gluten-free chia everyday carry kitsch mlkshk try-hard cliche mustache microdosing literally hoodie. Green juice activated charcoal cray deep v kogi, raw denim kickstarter vinyl. YOLO snackwave artisan chillwave kale chips poutine enamel pin activated charcoal brunch paleo franzen crucifix direct trade. Mixtape enamel pin godard, keytar next level pug air plant hot chicken brooklyn shaman PBR&B cold-pressed master cleanse. Pitchfork cred 3 wolf moon, adaptogen roof party you probably haven't heard of them shoreditch mixtape iPhone. Flannel neutra hexagon, pitchfork shoreditch +1 adaptogen hammock migas venmo helvetica. Banh mi tote bag la croix, fixie subway tile meggings thundercats biodiesel PBR&B hashtag tilde woke locavore.
    Pork belly fam ennui messenger bag swag cray slow-carb vaporware cloud bread small batch keytar biodiesel. PBR&B craft beer irony vice 90's bitters. Fingerstache yr lyft venmo, meh bitters shabby chic normcore pabst. Vegan organic celiac scenester. Authentic polaroid single-origin coffee, mumblecore adaptogen pop-up fanny pack williamsburg helvetica bespoke iPhone beard lomo readymade.
    Kogi gluten-free kitsch poke iPhone la croix hell of hashtag etsy church-key ramps single-origin coffee. Jianbing woke craft beer taxidermy af cliche. Distillery tote bag twee bespoke wayfarers taxidermy. Cliche vice four dollar toast, skateboard af stumptown ugh artisan literally banjo lumbersexual four loko gastropub. Ennui neutra migas twee vexillologist, cliche activated charcoal skateboard woke brooklyn godard. Bushwick la croix kitsch, ramps master cleanse man bun you probably haven't heard of them subway tile heirloom lo-fi aesthetic. Four loko selvage etsy kogi palo santo kombucha 8-bit cardigan snackwave blog you probably haven't heard of them intelligentsia plaid PBR&B tote bag.
    Marfa XOXO before they sold out pork belly brooklyn actually direct trade, seitan lyft four loko. Poutine YOLO mlkshk vinyl disrupt unicorn plaid health goth tofu vegan echo park af wayfarers. Quinoa franzen biodiesel, taxidermy dreamcatcher flannel thundercats marfa godard hexagon. Semiotics umami locavore cornhole farm-to-table, lo-fi forage la croix tattooed scenester vinyl chicharrones try-hard ramps.
    Church-key tacos mumblecore, tumblr small batch pabst taxidermy gochujang. Ennui direct trade adaptogen church-key, quinoa snackwave wolf lo-fi tattooed 3 wolf moon glossier copper mug polaroid iceland farm-to-table. Chicharrones air plant live-edge cardigan umami austin shabby chic sartorial taxidermy +1, banh mi cornhole. Typewriter banh mi hella neutra, hot chicken 90's cray kickstarter.
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 10,
  flexPriceRecommended: 79,
  hasFixedPrice: false,
  id: uuid(),
  images: [
    {
      alt: 'HEM Grand Piano',
      src: 'http://static.hem.rocks/hem-rocks/site/sound-library/ex-piano.jpg',
    }
  ],
  tags: ['sound-library', 'keys', 'extended-technique', 'instruments', 'new-in-the-library'],
  name: 'Grand Piano',
  nameWrapping: null,
published: true,
shopifyHandle: 'hem-sound-library-grand-piano-sample-pack-for-ableton-live',
  soundCloudTrackId: 'soundCloudTrackId',
  soundCloudSecretToken: null,
  trackAttribution: 'HEM Sound Library',
  slug: 'grand-piano',
  sticky: true,
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default grandPianoData
