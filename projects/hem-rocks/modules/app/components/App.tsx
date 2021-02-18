import React, { ReactElement, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isArray, map } from 'lodash'
import ReactGA from 'react-ga'
import Cookies from 'js-cookie'
import { slugify } from 'voca'
import { setCartProducts } from '../../cart'
import { setCurrentItem, setCurrentProject, getContentItemsFromList, contentItemToTrack, requestReadChunk, IContentItem, getContentItemBySlug, hasCategory } from '../../content'
import { Hide, ElectronNot, ScrollToTop } from '../../../../../lib/components'
import { openPopup, closePopup } from '../../../../../lib/modules/popups'
import { setPlayerPlaylist, replacePlaylist, setPlayerInstance, setPlayerPlaylistExpanded, setPlayerExpanded } from '../../../../../lib/modules/website-player'
import { usePrevious } from '../../../../../lib/hooks'
import { Popups, getCookieName, SplitTests, PlayerFrame } from '../index'
import { RoutingHub, CookiesFrame } from './index'
import { PROJECT_CONFIGS } from '../../../config'
import { RootState } from '../../../index'

const siteFrames = {
  'hem.rocks': React.lazy(() => import('../../hem.rocks/components/ProjectFrame')),
  'jag.rocks': React.lazy(() => import('../../jag.rip/components/ProjectFrame')),
}

function App(): ReactElement {
  const {
    chunkLog,
    contentItems,
    currentlyOpenPopUp,
    currentProject,
    currentProjectSettingItem,
  } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    currentProject: state.content.currentProject,
    currentProjectSettingItem: getContentItemBySlug(state.content.contentItems, 'setting-current-project'),
  }))

  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const history = useHistory()

  useEffect(function initPlayer() {
    dispatch(setPlayerInstance())
  }, [])

  useEffect(function getCartFromCookies() {
    const cartCookie = Cookies.get(getCookieName('cart', currentProject))
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

  useEffect(function loadSettings() {
    if (chunkLog.includes('settings')) return
    dispatch(requestReadChunk('settings'))
  }, [chunkLog])

  useEffect(function preloadSiteText() {
    if (chunkLog.includes('site-texts')) return
    dispatch(requestReadChunk('site-texts'))
  }, [chunkLog])

  useEffect(function preloadEmbeddedEssays() {
    if (chunkLog.includes('embedded-essays')) return
    dispatch(requestReadChunk('embedded-essays'))
  }, [chunkLog])

  useEffect(function initProject() {
    if (!currentProjectSettingItem) return
    if (currentProjectSettingItem.description === currentProject) return
    dispatch(setCurrentProject(currentProjectSettingItem.description))
  }, [currentProjectSettingItem])

  useEffect(function handleRoutedPopups() {
    const [basePath, slug, cart, orCart] = pathname.replace(/^\//, '').split('/')
    const requestedContentItem = contentItems.find(item =>
      item.slug === slug && !hasCategory(item, 'site-texts')
    )

    const routedPopups = PROJECT_CONFIGS[currentProject]
      .ROUTED_POPUPS
      .map(basePath => ({
        basePath,
        id: 'detail-popup',
      }))

    let popupId

    if (
      basePath === 'cart'
      || slug === 'cart'
      || cart === 'cart'
      || orCart === 'cart'
    ) {
      popupId = 'cart-popup'
    }

    if (basePath === 'thank-you') {
      popupId = 'thank-you-popup'
    }

    if (!popupId) {
      for (const routedPopup of routedPopups) {
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

      const staticPageCartReturnPaths = [
        'sound-library/made-with-sl',
        'sound-library/about-sl',
        'about',
        'contact',
        'mailing-list',
        'support',
      ]

      let cartReturnFound = false

      for (const staticPageCartReturnPath of staticPageCartReturnPaths) {
        if (
          pathname.includes(staticPageCartReturnPath)
          && pathname.includes('cart')
        ) {
          path = '/' + staticPageCartReturnPath
          cartReturnFound = true
          break
        }
      }

      if (
        !cartReturnFound
        && map(genericRoutedPopups, 'basePath').includes(pathnameSplit[0])
      ) {
        path += pathnameSplit[0]

        if (pathnameSplit[2]) {
          path += '/filter/' + pathnameSplit[2]
        }
      }

      history.push(path)
    }
  }, [currentlyOpenPopUp, previouslyOpenPopup])

  useEffect(function trackPageView() {
    ReactGA.pageview(pathname)
  }, [pathname])

  useEffect(function setSplitTestCookies() {
    const { FlexPricingType } = SplitTests

    if (!Cookies.get(getCookieName(FlexPricingType))) {
      const type = Math.random() > .5 ? 'input' : 'buttons'
      Cookies.set(getCookieName(FlexPricingType), type, { expires: 7 })
    }
  }, [])

  const SiteFrame = siteFrames[currentProject]

  if (!SiteFrame) return (<div></div>)

  return (
    <div className={`
      hem-application
      ${ pathname.includes('admin') ? 'is-admin' : '' }
      ${ process.env.NODE_ENV === 'production' ? 'node-env-production' : '' }
      ${
        pathname === '/'
        || pathname === '/cart'
        || pathname === '/cart/'
        || pathname === '/thank-you'
        || pathname === '/thank-you/'
        || pathname.includes('/home')
          ? ' app-is-home'
          : ''
      }
    `}>
      <ScrollToTop scrollPaneSelector=".scroll-lock-container" />

      <SiteFrame>
        <RoutingHub />
      </SiteFrame>

      { PROJECT_CONFIGS[currentProject].PLAYER && (
        <Hide from={PROJECT_CONFIGS[currentProject].HIDE_PLAYER_FRAME_FOR}>
          <PlayerFrame />
        </Hide>
      )}

      <ElectronNot>
        { PROJECT_CONFIGS[currentProject].USES_COOKIES && (
          <Hide from={PROJECT_CONFIGS[currentProject].HIDE_COOKIES_FRAME_FOR}>
            <CookiesFrame />
          </Hide>
        )}
      </ElectronNot>

      <Popups />
    </div>
  )
}

export default App
