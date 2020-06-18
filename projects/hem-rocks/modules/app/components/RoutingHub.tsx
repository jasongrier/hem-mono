import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Apps,
  Articles,
  Code,
  Faqs,
  Label,
  Merch,
  Mixes,
  Press,
  PressKits,
  SoundLibrary,
  Tracks,
  Tutorials,
  UserGuides,
  Videos,
} from '../../../routes/content'

import {
  Admin,
  InternalCalendar,
  Checklists,
  InternalHome,
} from '../../../routes/internal'

import {
  About,
  CompilationIVArtistInfo,
  Contact,
  CookieSettings,
  Home,
  MailingList,
} from '../../../routes/static'

import {
  Venue,
  VenueArchive,
  VenueMerch,
  VenueStage,
} from '../../../routes/venue'

function RoutingHub(): ReactElement {

  return (
    <div className="routing-hub">
      <Switch>
        {/* Home */}
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Home} />
        <Route exact path="/thank-you" component={Home} />

        {/* Static Pages */}
        <Route exact path="/about" component={About} />
        <Route exact path="/about/cart" component={About} />

        <Route exact path="/contact" component={Contact} />
        <Route exact path="/contact/cart" component={Contact} />

        <Route exact path="/cookie-settings" component={CookieSettings} />
        <Route exact path="/cookie-settings/cart" component={CookieSettings} />

        <Route exact path="/mailing-list" component={MailingList} />
        <Route exact path="/mailing-list/cart" component={MailingList} />

        <Route exact path="/venue-main-stage" component={VenueStage} />
        <Route exact path="/venue-main-stage/cart" component={VenueStage} />

        {/* Temporary Static Pages */}
        <Route exact path="/compilation-iv-artist-info" component={CompilationIVArtistInfo} />
        <Route exact path="/compilation-iv-artist-info/cart" component={CompilationIVArtistInfo} />

        {/* List Pages */}
        <Route exact path="/apps/:contentItemSlug?/:filter?" component={Apps} />
        <Route exact path="/apps/filter/:filter" component={Apps} />
        <Route exact path="/apps/cart/:filter?" component={Apps} />

        <Route exact path="/articles/:contentItemSlug?/:filter?" component={Articles} />
        <Route exact path="/articles/filter/:filter" component={Articles} />
        <Route exact path="/articles/cart/:filter?" component={Articles} />

        <Route exact path="/code/:contentItemSlug?/:filter?" component={Code} />
        <Route exact path="/code/filter/:filter" component={Code} />
        <Route exact path="/code/cart/:filter?" component={Code} />

        <Route exact path="/faqs/:contentItemSlug?/:filter?" component={Faqs} />
        <Route exact path="/faqs/filter/:filter" component={Faqs} />
        <Route exact path="/faqs/cart/:filter?" component={Faqs} />

        <Route exact path="/label/:contentItemSlug?/:filter?" component={Label} />
        <Route exact path="/label/filter/:filter" component={Label} />
        <Route exact path="/label/cart/:filter?" component={Label} />

        <Route exact path="/merch/:contentItemSlug?/:filter?" component={Merch} />
        <Route exact path="/merch/filter/:filter" component={Merch} />
        <Route exact path="/merch/cart/:filter?" component={Merch} />

        <Route exact path="/mixes/:contentItemSlug?/:filter?" component={Mixes} />
        <Route exact path="/mixes/filter/:filter" component={Mixes} />
        <Route exact path="/mixes/cart/:filter?" component={Mixes} />

        <Route exact path="/press/:contentItemSlug?/:filter?" component={Press} />
        <Route exact path="/press/filter/:filter" component={Press} />
        <Route exact path="/press/cart/:filter?" component={Press} />

        <Route exact path="/press-kits/:contentItemSlug?/:filter?" component={PressKits} />
        <Route exact path="/press-kits/filter/:filter" component={PressKits} />
        <Route exact path="/press-kits/cart/:filter?" component={PressKits} />

        <Route exact path="/sound-library/:contentItemSlug?/:filter?" component={SoundLibrary} />
        <Route exact path="/sound-library/filter/:filter" component={SoundLibrary} />
        <Route exact path="/sound-library/cart/:filter?" component={SoundLibrary} />

        <Route exact path="/tracks/:contentItemSlug?/:filter?" component={Tracks} />
        <Route exact path="/tracks/filter/:filter" component={Tracks} />
        <Route exact path="/tracks/cart/:filter?" component={Tracks} />

        <Route exact path="/tutorials/:contentItemSlug?/:filter?" component={Tutorials} />
        <Route exact path="/tutorials/filter/:filter" component={Tutorials} />
        <Route exact path="/tutorials/cart/:filter?" component={Tutorials} />

        <Route exact path="/user-guides/:contentItemSlug?/:filter?" component={UserGuides} />
        <Route exact path="/user-guides/filter/:filter" component={UserGuides} />
        <Route exact path="/user-guides/cart/:filter?" component={UserGuides} />

        <Route exact path="/venue-archive/:contentItemSlug?/:filter?" component={VenueArchive} />
        <Route exact path="/venue-archive/filter/:filter" component={VenueArchive} />
        <Route exact path="/venue-archive/cart/:filter?" component={VenueArchive} />

        <Route exact path="/venue-calendar/:contentItemSlug?/:filter?" component={Venue} />
        <Route exact path="/venue-calendar/filter/:filter" component={Venue} />
        <Route exact path="/venue-calendar/cart/:filter?" component={Venue} />

        <Route exact path="/venue-merch/:contentItemSlug?/:filter?" component={VenueMerch} />
        <Route exact path="/venue-merch/filter/:filter" component={VenueMerch} />
        <Route exact path="/venue-merch/cart/:filter?" component={VenueMerch} />

        <Route exact path="/videos/:contentItemSlug?/:filter?" component={Videos} />
        <Route exact path="/videos/filter/:filter" component={Videos} />
        <Route exact path="/videos/cart/:filter?" component={Videos} />

        {/* Internal Pages */}
        <Route exact path="/internal" component={InternalHome} />
        <Route exact path="/internal/checklists" component={Checklists} />
        <Route exact path="/internal/calendar" component={InternalCalendar} />

        {/* Desktop Admin Application */}
        <Route path="/admin" component={Admin} />
      </Switch>
    </div>
  )
}

export default RoutingHub
