import { IContentItem } from '../../index'
import uuid from 'uuid/v1'
import autop from 'lines-to-paragraphs'

const grandPianoData: IContentItem = {
  blurb: `
    I'm baby austin flexitarian artisan typewriter vice tofu crucifix. Pinterest truffaut stumptown, raw denim offal viral four dollar toast man bun. Church-key cardigan authentic, microdosing chambray literally seitan quinoa mixtape man bun. Viral meggings master cleanse 90's affogato raclette.
  `,
  description: autop(`
    I'm baby cloud bread polaroid bitters vinyl raclette shaman hammock. Ramps sriracha jianbing, taiyaki affogato kogi palo santo coloring book celiac gochujang. Tousled offal selfies, gluten-free raclette chambray normcore vinyl ennui humblebrag green juice migas. Butcher cornhole brooklyn, fixie woke tacos blue bottle dreamcatcher beard wolf meggings asymmetrical four loko. Pitchfork aesthetic YOLO chillwave before they sold out tote bag fanny pack. Etsy heirloom hammock tumblr, la croix food truck blog mixtape listicle.

    Offal godard subway tile, kitsch succulents umami venmo truffaut pinterest bushwick. Salvia chambray snackwave raclette dreamcatcher DIY knausgaard freegan master cleanse gastropub jean shorts. Selfies shabby chic organic man bun williamsburg yuccie la croix. Man bun tilde kogi stumptown forage listicle keytar pork belly tousled food truck. Kogi vegan raw denim affogato roof party crucifix keffiyeh quinoa scenester.

    Helvetica kitsch chartreuse butcher. Ramps keytar meh taiyaki williamsburg, kogi hammock echo park. Skateboard art party franzen normcore green juice, four loko pitchfork venmo ugh migas tacos kogi tilde scenester four dollar toast. Dreamcatcher man bun chia four dollar toast prism fingerstache godard narwhal brunch shaman shoreditch selvage ramps vegan meggings.

    +1 keytar tousled lomo trust fund enamel pin beard lyft master cleanse shaman flexitarian biodiesel. Disrupt fanny pack pour-over ethical snackwave edison bulb. Plaid viral hashtag pok pok, waistcoat snackwave man bun hella salvia freegan lumbersexual health goth. Kogi street art thundercats, organic echo park asymmetrical salvia synth gochujang small batch live-edge man bun before they sold out craft beer. Chambray cornhole sustainable wolf photo booth venmo edison bulb. Etsy salvia cronut whatever, raw denim post-ironic freegan gluten-free trust fund bespoke adaptogen woke typewriter. Mlkshk dreamcatcher cornhole DIY, normcore PBR&B drinking vinegar blog.

    Enamel pin copper mug shoreditch fanny pack craft beer adaptogen photo booth salvia small batch brooklyn hot chicken gochujang tumblr cronut. Etsy sriracha echo park farm-to-table typewriter, meditation chillwave kitsch seitan man braid celiac cray shaman. Shoreditch chillwave post-ironic bicycle rights hoodie 90's. Drinking vinegar four dollar toast squid, tattooed shoreditch meh echo park prism wayfarers jean shorts live-edge gastropub 90's pork belly ugh. Wayfarers cred post-ironic readymade narwhal banjo ethical tote bag dreamcatcher everyday carry portland meh marfa. Cray etsy four dollar toast poutine.
  `),
  featureList: [],
  fixedPrice: null,
  flexPriceMinimum: 0,
  hasFixedPrice: false,
  id: uuid(),
  images: [],
  tags: ['sound-library'],
  name: 'Grand Piano',
  soundCloudTrackId: '310321087',
  slug: 'grand-piano',
  type: 'Sample Pack for Ableton Live',
  userSuggestedPrice: null,
  videos: [],
}

export default grandPianoData
