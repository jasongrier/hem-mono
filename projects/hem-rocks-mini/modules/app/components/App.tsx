import React, { ReactElement, useEffect } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { find, isArray, compact } from 'lodash'
import ReactGA from 'react-ga'
import Cookies from 'js-cookie'
import { CartPopup, setCartProducts } from '../../cart'
import { ThankYouPopup } from '../../cart'
import { DetailPopUp, requestReadItems, setCurrentItem, hasTag, getContentItemsFromList, contentItemToTrack } from '../../content'
import { ProtectedContent } from '../../login'
import { CampaignMonitorForm, ElectronNot, ScrollToTop, NagToaster, Spinner } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../../lib/modules/popups'
import { PlayerBar, setPlayerPlaylist } from '../../../../../lib/modules/player'
import { usePrevious } from '../../../../../lib/hooks'
import { collapseTopBar, expandTopBar, getCookieName } from '../index'
import { SiteFooter, TopBar } from '../../../components/layout'
import { requestActiveLiveStream, setCookieApproval, setCookiePreferencesSet } from '../actions'
import CookieApproval from './CookieApproval'
import { CAMPAIGN_MONITOR_FORM_ID } from '../../../config'
import { RootState } from '../../../index'

import {
  Apps,
  Admin,
  Home,
  Info,
  Label,
  Code,
  SoundLibrary,
  Venue,
  VenueArchive,
  VenueStage,
} from '../../../routes'

function App(): ReactElement {
  const {
    contentItems,
    cookiesAnalyticsApproved,
    cookiesMarketingApproved,
    currentContentItem,
    currentlyOpenPopUp,
    sitePlaylist,
    topBarCollapsed,
  } = useSelector((state: RootState) => ({
    cookiesAnalyticsApproved: state.app.cookiesAnalyticsApproved,
    cookiesMarketingApproved: state.app.cookiesMarketingApproved,
    contentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    sitePlaylist: state.player.playlist,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const history = useHistory()

  const genericRoutedPopups = [
    { basePath: 'label', id: 'detail-popup' },
    { basePath: 'apps', id: 'detail-popup' },
    { basePath: 'sound-library', id: 'detail-popup' },
    { basePath: 'venue-calendar', id: 'detail-popup' },
    { basePath: 'venue-archive', id: 'detail-popup' },
  ]

  useEffect(function getCookieApprovals() {
    const cookiePreferencesSet = !!Cookies.get(getCookieName(`cookie-preferences-set`))

    if (cookiePreferencesSet) {
      dispatch(setCookiePreferencesSet(true, false))
    }

    const cookieApprovals = [
      'analytics',
      'marketing',
    ]

    for (const name of cookieApprovals) {
      if (Cookies.get(getCookieName(`${name}-cookie-approved`))) {
        dispatch(setCookieApproval(name, cookiePreferencesSet, false))
      }
    }
  }, [])

  useEffect(function checkAnalyticsCookieApproval() {
    if (cookiesAnalyticsApproved) {
      ReactGA.initialize('UA-163585797-1')
    }
  }, [cookiesAnalyticsApproved])

  useEffect(function fetchContent() {
    dispatch(requestReadItems({ page: 1, size: 10000 }))
  }, [])

  useEffect(function setActiveLiveStream() {
    if (window.process?.env.ELECTRON_MONO_DEV) return

    dispatch(requestActiveLiveStream())

    const liveStreamStatePoll = window.setInterval(function pollForLiveStreamState() {
      dispatch(requestActiveLiveStream())
    }, 30000)

    return function cleanup() {
      window.clearInterval(liveStreamStatePoll)
    }
  }, [])

  useEffect(function getCartFromCookies() {
    const cartCookie = Cookies.get(getCookieName('cart'))
    if (!cartCookie) return

    try {
      const cartProducts = JSON.parse(cartCookie)

      if (!cartProducts) return
      if (!isArray(cartProducts)) return
      if (!cartProducts.length) return

      dispatch(setCartProducts(cartProducts))
    }

    catch(err) {
      console.error('Could not get cart cookie: ' + err)
    }
  }, [])

  useEffect(function setSitePlaylist() {
    const sitePlaylistTrackItems = getContentItemsFromList(contentItems, 'site-playlist')
    const sitePlaylistTracks = sitePlaylistTrackItems.map(item =>
      contentItemToTrack(item, hasTag(item, 'attachment') ? item.relatedContentLink : `/tracks/${item.slug}`)
    )

    dispatch(setPlayerPlaylist(sitePlaylistTracks))
  }, [contentItems])

  useEffect(function routedPopup() {
    const [basePath, slug] = pathname.replace(/^\//, '').split('/')
    const requestedContentItem = find(contentItems, { slug })

    let popupId

    if (
      basePath === 'cart'
      || slug === 'cart'
    ) {
      popupId = 'cart-popup'
    }

    if (basePath === 'thank-you') {
      popupId = 'thank-you-popup'
    }

    if (!popupId) {
      for (const routedPopup of genericRoutedPopups) {
        if (
          basePath === routedPopup.basePath
          && requestedContentItem
        ) {
          popupId = routedPopup.id
          break
        }
      }
    }

    if (popupId === currentlyOpenPopUp) return

    if (popupId) {

      dispatch(closePopup())

      if (requestedContentItem) {
        dispatch(setCurrentItem(requestedContentItem))
      }

      dispatch(openPopup(popupId))
    }

    else {
      dispatch(closePopup())
    }
  }, [contentItems, pathname])

  const previouslyOpenPopup = usePrevious(currentlyOpenPopUp)

  useEffect(function closePopup() {
    if (!currentlyOpenPopUp && previouslyOpenPopup) {
      const pathnameSplit = pathname.replace(/^\//, '').split('/')
      let path = '/'

      if (
        pathnameSplit[0] === 'info'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'info'
      }

      if (
        pathnameSplit[0] === 'venue'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'venue'
      }

      else if (
        pathnameSplit[0] === 'label'
        || pathnameSplit[0] === 'projects'
        || pathnameSplit[0] === 'sound-library'
        || pathnameSplit[0] === 'venue-calendar'
        || pathnameSplit[0] === 'venue-archive'
      ) {

        path += pathnameSplit[0]

        if (pathnameSplit[2]) {
          path += '/filter/' + pathnameSplit[2]
        }
      }

      history.push(path)
    }
  }, [currentlyOpenPopUp, previouslyOpenPopup])

  useEffect(function setTopBar() {
    if (pathname !== '/') {
      dispatch(collapseTopBar())
    }

    else {
      dispatch(expandTopBar())
    }
  }, [pathname])

  useEffect(function trackPageView() {
    ReactGA.pageview(pathname)
  }, [pathname])

  if (!contentItems || !contentItems.length) return (
    <div className="app-loading">
      <h1>
        <div>HEM</div>
        <Spinner />
      </h1>
    </div>
  )

  return (
    <div className={`hem-application hem-rocks-mini${pathname === '/' ? ' app-is-home' : ''}`}>
      <ProtectedContent header="Super secret preview">
        <ScrollToTop />

        <TopBar />

        <main className="main-content">
          <div className="tabs-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Home} />
              <Route exact path="/thank-you" component={Home} />

              <Route exact path="/info" component={Info} />
              <Route exact path="/info/cart" component={Info} />

              <Route exact path="/code/:contentItemSlug?/:filter?" component={Code} />
              <Route exact path="/code/filter/:filter" component={Code} />
              <Route exact path="/code/cart/:filter?" component={Code} />

              <Route exact path="/apps/:contentItemSlug?/:filter?" component={Apps} />
              <Route exact path="/apps/filter/:filter" component={Apps} />
              <Route exact path="/apps/cart/:filter?" component={Apps} />

              <Route exact path="/label/:contentItemSlug?/:filter?" component={Label} />
              <Route exact path="/label/filter/:filter" component={Label} />
              <Route exact path="/label/cart/:filter?" component={Label} />


              <Route exact path="/sound-library/:contentItemSlug?/:filter?" component={SoundLibrary} />
              <Route exact path="/sound-library/filter/:filter" component={SoundLibrary} />
              <Route exact path="/sound-library/cart/:filter?" component={SoundLibrary} />

              <Route exact path="/venue-calendar/:contentItemSlug?/:filter?" component={Venue} />
              <Route exact path="/venue-calendar/filter/:filter" component={Venue} />
              <Route exact path="/venue-calendar/cart/:filter?" component={Venue} />

              <Route exact path="/venue/cart" component={Venue} />
              <Route exact path="/venue/main-stage" component={VenueStage} />
              <Route exact path="/venue/main-stage/cart" component={VenueStage} />
              <Route exact path="/venue/archive" component={VenueArchive} />
              <Route exact path="/venue/archive/cart" component={VenueArchive} />

              <Route path="/admin" component={Admin} />
            </Switch>
          </div>
        </main>
        <footer className="main-footer">
          <SiteFooter />
        </footer>

        <PopupContainer
          closeIcon={CloseButton}
          id="detail-popup"
        >
          <DetailPopUp
            contentItem={currentContentItem}
            filter={pathname.split('/')[3]}
            category={pathname.split('/')[1]}
          />
        </PopupContainer>

        <PopupContainer
          closeIcon={false}
          escapeKeyCloses={false}
          overlayCloses={false}
          id="cart-popup"
        >
          {(props: any) => (
            <CartPopup redirecting={props?.redirecting} />
          )}
        </PopupContainer>


        <PopupContainer
          closeIcon={CloseButton}
          id="thank-you-popup"
        >
          {(props: any) => (
            <ThankYouPopup itemSlugs={props?.itemSlugs} />
          )}
        </PopupContainer>

        <PlayerBar />
      </ProtectedContent>

      <ElectronNot>
        <CookieApproval />
      </ElectronNot>

      { cookiesMarketingApproved && !Cookies.get(getCookieName('cannot-show-email-nag')) && (
        <ElectronNot>
          <NagToaster
            closeIcon={CloseButton}
            id="hem-rocks-website-email-nag"
            delay={1}
            onDismiss={() => {
              ReactGA.event({
                category: 'User',
                action: 'Closed the mailing list nag popup without joining.',
              })
              Cookies.set(getCookieName('cannot-show-email-nag'), 'true')
            }}
          >
            {({ dismissNag }: any) => (
              <CampaignMonitorForm
                id={CAMPAIGN_MONITOR_FORM_ID}
                onFormSubmitted={() => {
                  ReactGA.event({
                    category: 'User',
                    action: 'Joined the mailing list from the nag popup.',
                  })
                  dismissNag()
                }}
                submitButtonText="Sign me up!"
              />
            )}
          </NagToaster>
        </ElectronNot>
      )}
    </div>
  )
}

export default App
