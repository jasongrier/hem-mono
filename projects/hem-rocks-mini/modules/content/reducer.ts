import { AnyAction } from 'redux'
import { clone } from 'lodash'
import produce from 'immer'
import uuid from 'uuid/v1'
import {
  SET_CURRENT_CONTENT_ITEM,

  IState,
} from './index'

function fakeContentItem(tag: string, soundCloudTrackId: string, slug: string) {
  return {
    blurb: "I'm baby austin flexitarian artisan typewriter vice tofu crucifix. Pinterest truffaut stumptown, raw denim offal viral four dollar toast man bun. Church-key cardigan authentic, microdosing chambray literally seitan quinoa mixtape man bun. Viral meggings master cleanse 90's affogato raclette.",
    description: `
      <p>
        I'm baby hexagon food truck cloud bread heirloom subway tile, austin put a bird on it deep v crucifix. Artisan roof party seitan shoreditch, 8-bit actually fanny pack cloud bread activated charcoal tbh wayfarers. Trust fund offal hella succulents vaporware. Green juice craft beer iPhone lo-fi, synth mumblecore kitsch readymade af everyday carry wayfarers selfies vape raclette echo park. 8-bit viral franzen fixie, keytar occupy schlitz. Swag fingerstache occupy brunch, shoreditch listicle biodiesel dreamcatcher hell of tumblr shabby chic shaman stumptown umami. Bespoke PBR&B echo park YOLO hammock locavore forage everyday carry.
      </p>
      <p>
        Polaroid tote bag green juice, activated charcoal typewriter taiyaki fanny pack 3 wolf moon woke ethical trust fund raclette taxidermy. Aesthetic irony cray VHS master cleanse, kitsch fashion axe offal. Butcher locavore chillwave palo santo fam listicle typewriter. Messenger bag literally af photo booth, meh schlitz kogi palo santo raclette. Pinterest austin VHS banh mi kale chips meditation blog hashtag chia.
      </p>
      <p>
        Cray truffaut chia swag franzen. DIY locavore cold-pressed green juice four loko paleo meh kale chips freegan PBR&B succulents vegan. Art party bicycle rights XOXO poke typewriter, fixie activated charcoal snackwave normcore shabby chic brooklyn iceland vaporware helvetica. VHS sustainable vinyl tote bag, plaid leggings tattooed chicharrones.
      </p>
      <p>
        Taxidermy palo santo jianbing activated charcoal letterpress bespoke. Kale chips cliche kinfolk post-ironic. Small batch kogi art party, kombucha keytar pop-up freegan affogato bushwick leggings succulents hammock selvage artisan. Chia mumblecore kitsch, pickled bushwick sartorial flexitarian 8-bit pinterest. Put a bird on it pork belly cronut green juice bitters single-origin coffee squid migas wolf cornhole ethical meditation kombucha gentrify la croix. Twee hoodie deep v listicle offal vinyl leggings cardigan edison bulb subway tile humblebrag shoreditch austin. Yuccie echo park neutra celiac cardigan.
      </p>
      <p>
        Art party brooklyn kombucha, flannel prism quinoa waistcoat selfies. Polaroid microdosing offal photo booth synth, VHS raclette waistcoat listicle edison bulb small batch jean shorts readymade whatever truffaut. Chia offal chartreuse disrupt sartorial. Vape letterpress pabst twee coloring book. Air plant vexillologist quinoa typewriter, gastropub sriracha beard chia cold-pressed.
      </p>
    `,
    featureList: [],
    fixedPrice: null,
    flexPriceMinimum: 0,
    hasFixedPrice: false,
    id: uuid(),
    images: [],
    tags: [tag],
    name: 'Grand Piano',
    soundCloudTrackId,
    slug,
    type: 'Sample Pack for Ableton Live',
    userSuggestedPrice: null,
    videos: [],
  }
}

const initialState: IState = {
  currentContentItem: null,
  contentItems: [
    fakeContentItem('sound-library', '310321087', 'grand-piano'),
    fakeContentItem('sound-library', '310321091', 'foo'),
    fakeContentItem('sound-library', '310321093', 'bar'),
  ],
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case SET_CURRENT_CONTENT_ITEM: {
      return produce(state, draftState => {
        draftState.currentContentItem = payload
      })
    }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
