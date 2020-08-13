import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { find, isArray, map } from 'lodash'
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
import { PlayerBar, setPlayerPlaylist, replacePlaylist, setPlayerInstance } from '../../../../../lib/modules/website-player'
import { usePrevious } from '../../../../../lib/hooks'
import { collapseTopBar, expandTopBar, getCookieName } from '../index'
import { SiteFooter, TopBar } from '../../../components/layout'
import { requestActiveLiveStream, setCookieApproval, setCookiePreferencesSet } from '../actions'
import { CookieApproval, RoutingHub } from './index'
import { CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, MAILING_LIST_TEXT } from '../../../config'
import { RootState } from '../../../index'
import NewWebsitePopup from '../../../components/popups/NewWebsitePopup'

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
    { basePath: 'articles', id: 'detail-popup' },
    { basePath: 'code', id: 'detail-popup' },
    { basePath: 'faqs', id: 'detail-popup' },
    { basePath: 'faqs', id: 'detail-popup' },
    { basePath: 'label', id: 'detail-popup' },
    { basePath: 'merch', id: 'detail-popup' },
    { basePath: 'mixes', id: 'detail-popup' },
    { basePath: 'press', id: 'detail-popup' },
    { basePath: 'press-kits', id: 'detail-popup' },
    { basePath: 'sound-library', id: 'detail-popup' },
    { basePath: 'tracks', id: 'detail-popup' },
    { basePath: 'tutorials', id: 'detail-popup' },
    { basePath: 'user-guides', id: 'detail-popup' },
    { basePath: 'venue-archive', id: 'detail-popup' },
    { basePath: 'venue-calendar', id: 'detail-popup' },
    { basePath: 'venue-merch', id: 'detail-popup' },
    { basePath: 'videos', id: 'detail-popup' },
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
    const featuredTracksPlaylistTrackItems = getContentItemsFromList(contentItems, 'featured-tracks')
    const featuredTracksTracks = featuredTracksPlaylistTrackItems.map(item =>
      contentItemToTrack(item)
    )

    dispatch(replacePlaylist(0, { name: 'Featured Tracks', tracks: featuredTracksTracks }))
    dispatch(setPlayerPlaylist(0))

    const trackTags = [
      'Album Tracks',
      'Exclusives',
      'Live',
      'Made with SL',
      'Rarities',
      'Sound Library',
    ]

    trackTags.forEach((tag, i) => {
      const tracks = contentItems.filter(item => hasCategory(item, 'tracks') && hasTag(item, slugify(tag))).map(item =>
        contentItemToTrack(item)
      )
      dispatch(replacePlaylist(i + 2, { name: tag, tracks }))
    })

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
    <div className="app-loading">
      <h1>
        <div>HEM</div>
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
          ? ' app-is-home'
          : ''
      }
      ${process.env.NODE_ENV === 'production' ? 'node-env-production' : ''}
    `}>
      <ProtectedContent header="Super secret preview">
        <ScrollToTop />

        <TopBar />

        <main className="main-content">
          <div className="tabs-content">
            <RoutingHub />
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
          closeIcon={CloseButton}
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
          <ThankYouPopup />
        </PopupContainer>

        <PopupContainer
          closeIcon={CloseButton}
          id="new-website-popup"
        >
          <NewWebsitePopup />
        </PopupContainer>

        <PlayerBar />
      </ProtectedContent>

      <ElectronNot>
        <CookieApproval />
      </ElectronNot>

      { cookiesMarketingApproved
        && !Cookies.get(getCookieName('cannot-show-email-nag'))
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
                <h3>HEM Newsletter</h3>
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
