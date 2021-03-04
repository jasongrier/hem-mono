import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../index'
import { BERLIN_STOCK_PHOTOS } from '../../../../config'

import {
  Apps,
  Articles,
  Artists,
  Blog,
  Code,
  Editions,
  Faqs,
  GenericPage,
  Label,
  Merch,
  Mixes,
  News,
  Newsletters,
  Playlists,
  Press,
  PressKits,
  PressReleases,
  Recipes,
  SoundLibrary,
  Tracks,
  Tutorials,
  UserGuides,
  Videos,
} from '../../../../routes/hem.rocks/content'

import {
  Admin,
  Checklists,
  Docus,
  InternalCalendar,
  InternalHome,
  Notes,
  PrintFlipBooks,
  Sandbox,
  Todos,
} from '../../../../routes/hem.rocks/internal'

import {
  About,
  Contact,
  CookiePolicy,
  CookieSettings,
  DanceParty,
  Home,
  LifeInLetters,
  MadeWithSoundLibrary,
  MailingList,
  NotFound,
  ReactConsulting,
  Support,
  TracksOverview,
  AboutSL,
} from '../../../../routes/hem.rocks/static'

import {
  About as BerlinStockPhotosAbout,
  BerlinStockPhotos as BerlinStockPhotosHome,
  Contact as BerlinStockPhotosContact,
  NotFound as BerlinStockPhotosNotFound,
  LicenseAgreement as BerlinStockPhotosLicenseAgreement,
  Prints as BerlinStockPhotosPrints,
} from '../../../../routes/berlinstockphotos.com'

import {
  Home as JagHome,
  About as JagAbout,
} from '../../../../routes/jag.rip/static'

import {
  ReactJavascriptConsulting as JagReactJavascriptConsulting,
  BespokeWebDeveloper as JagBespokeWebDeveloper,
} from '../../../../routes/jag.rip/landing-pages'

function RoutingHub(): ReactElement {
  const { currentProject } = useSelector((state: RootState) => ({
    currentProject: state.content.currentProject,
  }))

  return (
    <div className="routing-hub">
      <Switch>
        {/* Home */}
        <Route exact path="/" component={currentProject === 'jag.rip' ? JagHome : Home} />
        <Route exact path="/cart" component={currentProject === 'jag.rip' ? JagHome : Home} />
        <Route exact path="/thank-you" component={currentProject === 'jag.rip' ? JagHome : Home} />

        {/* "Dynamic-Static" Pages */}
        <Route exact path="/page/:contentItemSlug" component={GenericPage} />
        <Route exact path="/page/:contentItemSlug/cart" component={GenericPage} />

        {/* Static Pages */}
        <Route exact path="/about" component={BERLIN_STOCK_PHOTOS ? JagAbout : About} />
        <Route exact path="/about/cart" component={BERLIN_STOCK_PHOTOS ? JagAbout : About} />

        <Route exact path="/contact" component={BERLIN_STOCK_PHOTOS ? BerlinStockPhotosContact : Contact} />
        <Route exact path="/contact/cart" component={BERLIN_STOCK_PHOTOS ? BerlinStockPhotosContact : Contact} />

        <Route exact path="/cookie-settings" component={CookieSettings} />
        <Route exact path="/cookie-settings/cart" component={CookieSettings} />

        <Route exact path="/cookie-policy" component={CookiePolicy} />
        <Route exact path="/cookie-policy/cart" component={CookiePolicy} />

        <Route exact path="/dance-party" component={DanceParty} />
        <Route exact path="/dance-party/cart" component={DanceParty} />

        <Route exact path="/mailing-list" component={MailingList} />
        <Route exact path="/mailing-list/cart" component={MailingList} />

        <Route exact path="/react-consulting" component={ReactConsulting} />
        <Route exact path="/react-consulting/cart" component={ReactConsulting} />

        <Route exact path="/react-javascript-consulting" component={JagReactJavascriptConsulting} />
        <Route exact path="/react-javascript-consulting/cart" component={JagReactJavascriptConsulting} />

        <Route exact path="/bespoke-web-developer" component={JagBespokeWebDeveloper} />
        <Route exact path="/bespoke-web-developer/cart" component={JagBespokeWebDeveloper} />

        <Route exact path="/sound-library/page/:contentItemSlug/:cart?" component={GenericPage} />

        <Route exact path="/tracks-overview" component={TracksOverview} />
        <Route exact path="/tracks-overview/cart" component={TracksOverview} />

        <Route exact path="/sound-library/about-sl" component={AboutSL} />
        <Route exact path="/sound-library/about-sl/cart" component={AboutSL} />

        <Route exact path="/sound-library/made-with-sl" component={MadeWithSoundLibrary} />
        <Route exact path="/sound-library/made-with-sl/cart" component={MadeWithSoundLibrary} />

        <Route exact path="/support" component={Support} />
        <Route exact path="/support/cart" component={Support} />

        {/* Special Pages */}
        <Route exact path="/life-in-letters" component={LifeInLetters} />

        {/* List Pages */}
        <Route exact path="/home/detail/detail/:contentItemSlug?/:filter?" component={currentProject === 'jag.rip' ? JagHome : Home} />
        <Route exact path="/home/filter/:filter" component={currentProject === 'jag.rip' ? JagHome : Home} />
        <Route exact path="/home/cart/:filter?" component={currentProject === 'jag.rip' ? JagHome : Home} />

        <Route exact path="/apps/detail/:contentItemSlug?/:filter?" component={Apps} />
        <Route exact path="/apps/filter/:filter" component={Apps} />
        <Route exact path="/apps/cart/:filter?" component={Apps} />

        <Route exact path="/blog/detail/:contentItemSlug?/:filter?" component={Blog} />
        <Route exact path="/blog/filter/:filter" component={Blog} />
        <Route exact path="/blog/cart/:filter?" component={Blog} />

        <Route exact path="/news/detail/:contentItemSlug?/:filter?" component={News} />
        <Route exact path="/news/filter/:filter" component={News} />
        <Route exact path="/news/cart/:filter?" component={News} />

        <Route exact path="/articles/detail/:contentItemSlug?/:filter?" component={Articles} />
        <Route exact path="/articles/filter/:filter" component={Articles} />
        <Route exact path="/articles/cart/:filter?" component={Articles} />

        <Route exact path="/editions/detail/:contentItemSlug?/:filter?" component={Editions} />
        <Route exact path="/editions/filter/:filter" component={Editions} />
        <Route exact path="/editions/cart/:filter?" component={Editions} />

        {/* <Route exact path="/code/detail/:contentItemSlug?/:filter?" component={Code} />
        <Route exact path="/code/filter/:filter" component={Code} />
        <Route exact path="/code/cart/:filter?" component={Code} /> */}

        {/* <Route exact path="/faqs/detail/:contentItemSlug?/:filter?" component={Faqs} />
        <Route exact path="/faqs/filter/:filter" component={Faqs} />
        <Route exact path="/faqs/cart/:filter?" component={Faqs} /> */}

        <Route exact path="/label/detail/:contentItemSlug?/:filter?" component={Label} />
        <Route exact path="/label/filter/:filter" component={Label} />
        <Route exact path="/label/cart/:filter?" component={Label} />

        {/* <Route exact path="/merch/detail/:contentItemSlug?/:filter?" component={Merch} />
        <Route exact path="/merch/filter/:filter" component={Merch} />
        <Route exact path="/merch/cart/:filter?" component={Merch} /> */}

        {/* <Route exact path="/mixes/detail/:contentItemSlug?/:filter?" component={Mixes} />
        <Route exact path="/mixes/filter/:filter" component={Mixes} />
        <Route exact path="/mixes/cart/:filter?" component={Mixes} /> */}

        <Route exact path="/artists/detail/:contentItemSlug?/:filter?" component={Artists} />
        <Route exact path="/artists/filter/:filter" component={Artists} />
        <Route exact path="/artists/cart/:filter?" component={Artists} />

        <Route exact path="/playlists/detail/:contentItemSlug?/:filter?" component={Playlists} />
        <Route exact path="/playlists/filter/:filter" component={Playlists} />
        <Route exact path="/playlists/cart/:filter?" component={Playlists} />

        <Route exact path="/press/detail/:contentItemSlug?/:filter?" component={Press} />
        <Route exact path="/press/filter/:filter" component={Press} />
        <Route exact path="/press/cart/:filter?" component={Press} />

        <Route exact path="/general-content/detail/:contentItemSlug?/:filter?" component={currentProject === 'jag.rip' ? JagHome : Home} />
        <Route exact path="/general-content/filter/:filter" component={currentProject === 'jag.rip' ? JagHome : Home} />
        <Route exact path="/general-content/cart/:filter?" component={currentProject === 'jag.rip' ? JagHome : Home} />

        <Route exact path="/newsletters/detail/:contentItemSlug?/:filter?" component={Newsletters} />
        <Route exact path="/newsletters/filter/:filter" component={Newsletters} />
        <Route exact path="/newsletters/cart/:filter?" component={Newsletters} />

        <Route exact path="/press-kits/detail/:contentItemSlug?/:filter?" component={PressKits} />
        <Route exact path="/press-kits/filter/:filter" component={PressKits} />
        <Route exact path="/press-kits/cart/:filter?" component={PressKits} />

        <Route exact path="/press-releases/detail/:contentItemSlug?/:filter?" component={PressReleases} />
        <Route exact path="/press-releases/filter/:filter" component={PressReleases} />
        <Route exact path="/press-releases/cart/:filter?" component={PressReleases} />

        <Route exact path="/recipes/detail/:contentItemSlug?/:filter?" component={Recipes} />
        <Route exact path="/recipes/filter/:filter" component={Recipes} />
        <Route exact path="/recipes/cart/:filter?" component={Recipes} />

        <Route exact path="/sound-library/detail/:contentItemSlug?/:filter?" component={SoundLibrary} />
        <Route exact path="/sound-library/filter/:filter" component={SoundLibrary} />
        <Route exact path="/sound-library/cart/:filter?" component={SoundLibrary} />

        <Route exact path="/tracks/detail/:contentItemSlug?/:filter?" component={Tracks} />
        <Route exact path="/tracks/filter/:filter" component={Tracks} />
        <Route exact path="/tracks/cart/:filter?" component={Tracks} />

        {/* <Route exact path="/tutorials/detail/:contentItemSlug?/:filter?" component={Tutorials} />
        <Route exact path="/tutorials/filter/:filter" component={Tutorials} />
        <Route exact path="/tutorials/cart/:filter?" component={Tutorials} /> */}

        {/* <Route exact path="/user-guides/detail/:contentItemSlug?/:filter?" component={UserGuides} />
        <Route exact path="/user-guides/filter/:filter" component={UserGuides} />
        <Route exact path="/user-guides/cart/:filter?" component={UserGuides} /> */}

        {/* <Route exact path="/venue-archive/detail/:contentItemSlug?/:filter?" component={VenueArchive} />
        <Route exact path="/venue-archive/filter/:filter" component={VenueArchive} />
        <Route exact path="/venue-archive/cart/:filter?" component={VenueArchive} />

        <Route exact path="/venue-calendar/detail/:contentItemSlug?/:filter?" component={Venue} />
        <Route exact path="/venue-calendar/filter/:filter" component={Venue} />
        <Route exact path="/venue-calendar/cart/:filter?" component={Venue} />

        <Route exact path="/venue-merch/detail/:contentItemSlug?/:filter?" component={VenueMerch} />
        <Route exact path="/venue-merch/filter/:filter" component={VenueMerch} />
        <Route exact path="/venue-merch/cart/:filter?" component={VenueMerch} />

        <Route exact path="/videos/detail/:contentItemSlug?/:filter?" component={Videos} />
        <Route exact path="/videos/filter/:filter" component={Videos} />
        <Route exact path="/videos/cart/:filter?" component={Videos} /> */}

        {/* Internal Pages */}
        <Route exact path="/internal" component={InternalHome} />
        <Route exact path="/internal/checklists" component={Checklists} />
        <Route exact path="/internal/calendar" component={InternalCalendar} />
        <Route exact path="/internal/docus" component={Docus} />
        <Route exact path="/internal/notes" component={Notes} />
        <Route exact path="/internal/print-flip-books" component={PrintFlipBooks} />
        <Route exact path="/internal/sandbox" component={Sandbox} />
        <Route exact path="/internal/todos" component={Todos} />

        {/* Desktop Admin Application */}
        <Route path="/admin" component={Admin} />

        {/* Berlin Stock Photos */}
        <Route exact path="/stock-photos-prints/detail/:contentItemSlug?" component={BerlinStockPhotosPrints} />
        <Route exact path="/stock-photos-prints/cart" component={BerlinStockPhotosPrints} />

        <Route exact path="/stock-photos-license" component={BerlinStockPhotosLicenseAgreement} />
        <Route exact path="/stock-photos-license/cart" component={BerlinStockPhotosLicenseAgreement} />

        <Route exact path="/stock-photos/detail/:contentItemSlug?/:filter?" component={BerlinStockPhotosHome} />
        <Route exact path="/stock-photos/filter/:filter" component={BerlinStockPhotosHome} />
        <Route exact path="/stock-photos/cart/:filter?" component={BerlinStockPhotosHome} />

        <Route exact path="/more-tags/detail/:contentItemSlug?/:filter?" component={BerlinStockPhotosHome} />
        <Route exact path="/more-tags/filter/:filter" component={BerlinStockPhotosHome} />
        <Route exact path="/more-tags/cart/:filter?" component={BerlinStockPhotosHome} />

        {/* Catch-all */}
        <Route path="*" component={ BERLIN_STOCK_PHOTOS ? BerlinStockPhotosNotFound : NotFound} />
      </Switch>
    </div>
  )
}

export default RoutingHub
