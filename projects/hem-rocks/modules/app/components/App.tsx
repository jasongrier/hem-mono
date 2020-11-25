import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { compact, find, isArray, map, noop } from 'lodash'
import ReactGA from 'react-ga'
import Cookies from 'js-cookie'
import { slugify } from 'voca'
import { CartPopup, setCartProducts } from '../../cart'
import { ThankYouPopup } from '../../cart'
import { DetailPopUp, requestReadItems, setCurrentItem, hasTag, getContentItemsFromList, contentItemToTrack, hasCategory } from '../../content'
import { ProtectedContent } from '../../login'
import { CampaignMonitorForm, ElectronNot, ScrollToTop, NagToaster, Spinner, Toaster, ElectronOnly } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../../lib/modules/popups'
import { PlayerBar, setPlayerPlaylist, replacePlaylist, setPlayerInstance, setPlayerPlaylistExpanded, setPlayerExpanded, Albums, IAlbum, ITrack } from '../../../../../lib/modules/website-player'
import { usePrevious } from '../../../../../lib/hooks'
import { collapseTopBar, expandTopBar, getCookieName } from '../index'
import { SiteFooter, TopBar } from '../../../components/layout'
import { SoundLibraryRefreshPopup } from '../../../components/popups'
import { requestActiveLiveStream, setCookieApproval, setCookiePreferencesSet } from '../actions'
import { CookieApproval, RoutingHub, Popups } from './index'
import { CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, MAILING_LIST_TEXT, BERLIN_STOCK_PHOTOS } from '../../../config'
import { RootState } from '../../../index'
import NewWebsitePopup from '../../../components/popups/NewWebsitePopup'
import { assetHostHostname } from '../../../functions'
import { all } from 'redux-saga/effects'

function App(): ReactElement {
  const {
    cookiesAnalyticsApproved,
    cookiesMarketingApproved,

    contentItems,
    currentContentItem,

    playerError,

    currentlyOpenPopUp,
  } = useSelector((state: RootState) => ({
    cookiesAnalyticsApproved: state.app.cookiesAnalyticsApproved,
    cookiesMarketingApproved: state.app.cookiesMarketingApproved,

    contentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,

    playerError: state.player.error,

    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

  const dispatch = useDispatch()

  const [ openPlayerErrorToaster, setOpenPlayerErrorToaster ] = useState<(error: string) => void>()
  const [ initialPathname, setInitialPathname ] = useState<string>()

  const { pathname } = useLocation()

  const history = useHistory()

  const genericRoutedPopups = [
    { basePath: 'apps', id: 'detail-popup' },
    { basePath: 'blog', id: 'detail-popup' },
    { basePath: 'code', id: 'detail-popup' },
    { basePath: 'faqs', id: 'detail-popup' },
    { basePath: 'faqs', id: 'detail-popup' },
    { basePath: 'label', id: 'detail-popup' },
    { basePath: 'merch', id: 'detail-popup' },
    { basePath: 'mixes', id: 'detail-popup' },
    { basePath: 'press', id: 'detail-popup' },
    { basePath: 'press-kits', id: 'detail-popup' },
    { basePath: 'sound-library', id: 'detail-popup' },
    { basePath: 'stock-photos', id: 'detail-popup' },
    { basePath: 'tracks', id: 'detail-popup' },
    { basePath: 'tutorials', id: 'detail-popup' },
    { basePath: 'user-guides', id: 'detail-popup' },
    { basePath: 'venue-archive', id: 'detail-popup' },
    { basePath: 'venue-calendar', id: 'detail-popup' },
    { basePath: 'venue-merch', id: 'detail-popup' },
    { basePath: 'videos', id: 'detail-popup' },

    { basePath: 'stock-photos-prints', id: 'detail-popup' },
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
    if (cookiesAnalyticsApproved && !location.hostname.includes('localhost')) {
      const gaId = BERLIN_STOCK_PHOTOS ? 'UA-36136320-3' : 'UA-163585797-1'
      ReactGA.initialize(gaId)
    }
  }, [cookiesAnalyticsApproved])

  useEffect(function fetchContent() {
    dispatch(requestReadItems())
  }, [])

  useEffect(function initPlayer() {
    dispatch(setPlayerInstance())
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

  useEffect(function setSitePlaylists() {
    const allTracks = contentItems.filter(item => hasCategory(item, 'tracks')).map(item =>
      contentItemToTrack(item)
    )

    const albumItems = contentItems.filter(item => hasCategory(item, 'label') && hasTag(item, 'albums'))

    const albums: IAlbum[] = []
    let albumsPlaylistTracks: ITrack[] = []

    for (const albumItem of albumItems) {
      const trackSlugs = albumItem.trackSlugs.split("\n")
      const tracks = compact(trackSlugs.map(trackSlug => allTracks.find(
        track => track.id === trackSlug
      )))

      albums.push({
        coverArt: `${assetHostHostname()}/hem-rocks/content/images/key-art/${albumItem.keyArt}`,
        id: albumItem.slug,
        name: albumItem.title,
        date: albumItem.date,
        attribution: albumItem.attribution,
        attributionLink: albumItem.attributionLink,
        tracks,
      })

      albumsPlaylistTracks = albumsPlaylistTracks.concat(tracks || [])
    }

    const featuredTracksPlaylistTrackItems = getContentItemsFromList(contentItems, 'featured-tracks')
    const featuredTracksTracks = featuredTracksPlaylistTrackItems.map(item =>
      contentItemToTrack(item)
    )

    const trackTags = [
      'Featured',
      // 'Rare',
      'Live',
      'Mixes',
      // 'Made with SL',
      'Sound Library',
      // 'Video',
    ]

    trackTags.forEach((tag, i) => {
      const tracks = contentItems.filter(item => hasCategory(item, 'tracks') && hasTag(item, slugify(tag))).map(item =>
        contentItemToTrack(item)
      )
      dispatch(replacePlaylist(i, { name: tag, tracks }))
    })

    dispatch(replacePlaylist(trackTags.length, { name: 'Search Results', tracks: [] }))
    dispatch(replacePlaylist(trackTags.length + 1, { name: 'Empty', tracks: [] }))
    dispatch(setPlayerPlaylist(0))
  }, [contentItems])

  useEffect(function handlePlayerErrors() {
    if (!openPlayerErrorToaster) return
    if (!playerError) return

    openPlayerErrorToaster(playerError)
  }, [openPlayerErrorToaster, playerError])

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

    if (basePath === 'new-website') {
      popupId = 'new-website-popup'
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

    if (
      popupId === currentlyOpenPopUp
      && popupId !== 'detail-popup'
    ) return

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

  useEffect(function collapsePlayerOnRouteChange() {
    dispatch(setPlayerPlaylistExpanded(false))
    dispatch(setPlayerExpanded(false))
  }, [pathname])

  const previouslyOpenPopup = usePrevious(currentlyOpenPopUp)

  useEffect(function closePopup() {
    if (!currentlyOpenPopUp && previouslyOpenPopup) {
      const pathnameSplit = pathname.replace(/^\//, '').split('/')

      let path = '/'

      if (
        pathname === '/support'
        && previouslyOpenPopup === 'thank-you-popup'
      ) {
        path += 'support'
      }

      if (
        pathnameSplit[0] === 'info'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'info'
      }

      if (
        pathnameSplit[0] === 'about'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'about'
      }

      if (
        pathnameSplit[0] === 'contact'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'contact'
      }

      if (
        pathnameSplit[0] === 'venue'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'venue'
      }

      else if (map(genericRoutedPopups, 'basePath').includes(pathnameSplit[0])) {
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
    <div className={`
        app-loading
        ${ BERLIN_STOCK_PHOTOS ? 'berlin-stock-photos' : '' }
    `}>
      <h1>
        <div>{ BERLIN_STOCK_PHOTOS ? 'BERLIN STOCK PHOTOS' : 'HEM' }</div>
        <Spinner />
      </h1>
    </div>
  )

  return (
    <div className={`
      hem-application
      hem-rocks
      ${
        pathname === '/'
        || pathname === '/cart'
        || pathname === '/cart/'
        || pathname === '/thank-you'
        || pathname === '/thank-you/'
        || pathname === '/new-website'
        || pathname === '/new-website/'
        || BERLIN_STOCK_PHOTOS && !pathname.includes('admin')
          ? ' app-is-home'
          : ''
      }
      ${process.env.NODE_ENV === 'production' ? 'node-env-production' : ''}
      ${ BERLIN_STOCK_PHOTOS && !pathname.includes('admin') && !pathname.includes('internal') ? 'berlin-stock-photos' : '' }
      ${ pathname.includes('admin') ? 'is-admin' : '' }
    `}>
      <>
        <ScrollToTop scrollPaneSelector=".scroll-lock-content" />

        { !BERLIN_STOCK_PHOTOS && (
          <TopBar />
        )}

        <div className="scroll-lock-container">
          <div className="scroll-lock-content">
            <main className="main-content">
              <div className="tabs-content">
                <RoutingHub />
              </div>
            </main>
            { !BERLIN_STOCK_PHOTOS && (
              <footer className="main-footer">
                <SiteFooter />
              </footer>
            )}
          </div>
        </div>

        { currentContentItem && (
          <Popups currentContentItem={currentContentItem} />
        )}

        { !BERLIN_STOCK_PHOTOS && (
          <>
            <PlayerBar />
            <div
              className="player-bar-overlay"
              onClick={() => {
                dispatch(setPlayerExpanded(false))
                dispatch(setPlayerPlaylistExpanded(false))
              }}
            />
          </>
        )}
      </>

      <ElectronNot>
        <CookieApproval />
      </ElectronNot>

      { cookiesMarketingApproved
        && !Cookies.get(getCookieName('cannot-show-email-nag'))
        && !BERLIN_STOCK_PHOTOS
        && (
        <ElectronNot>
          <NagToaster
            closeIcon={CloseButton}
            delay={5000}
            id="hem-rocks-website-email-nag"
            onDismiss={() => {
              ReactGA.event({
                category: 'User',
                action: 'Closed the mailing list nag popup without joining.',
              })
            }}
            onLaunch={() => {
              ReactGA.event({
                category: 'System',
                action: 'The mailing list nag popped up.',
              })

              Cookies.set(getCookieName('cannot-show-email-nag'), 'true')
            }}
          >
            {() => (
              <>
                { BERLIN_STOCK_PHOTOS && (
                  <h3>Berlin Stock Photos Newsletter</h3>
                )}
                { !BERLIN_STOCK_PHOTOS && (
                  <h3>HEM Newsletter</h3>
                )}
                <p>{ MAILING_LIST_TEXT }</p>
                <CampaignMonitorForm
                  action={CAMPAIGN_MONITOR_FORM_ACTION}
                  emailFieldName={CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME}
                  id={CAMPAIGN_MONITOR_FORM_ID}
                  onFormSubmitted={() => {
                    ReactGA.event({
                      category: 'User',
                      action: 'Joined the mailing list from the nag popup.',
                    })
                  }}
                  submitButtonText="Sign me up!"
                />
              </>
            )}
          </NagToaster>
        </ElectronNot>
      )}

      { playerError && (
        <Toaster message={ playerError } />
      )}
    </div>
  )
}

export default App
