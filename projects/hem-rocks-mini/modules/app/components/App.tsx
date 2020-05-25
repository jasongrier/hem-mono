import React, { ReactElement, useEffect } from 'react'
import { NavLink, Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { find, isArray, map } from 'lodash'
// TODO: Why isn't set used in this component??
import ReactGA, { set } from 'react-ga'
import Cookies from 'js-cookie'
import { CartPopup, setCartProducts } from '../../cart'
import { ThankYouPopup } from '../../cart'
import { DetailPopUp, requestReadItems, setCurrentItem } from '../../content'
import { ElectronOnly, ScrollToTop, HamburgerMenu, Spinner } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../../lib/modules/popups'
import { usePrevious } from '../../../../../lib/hooks'
import { collapseTopBar, expandTopBar, MainNavItem, PlayerBar, TopBar } from '../index'
import EmailForm from './EmailForm'
import { requestActiveLiveStream } from '../actions'
import { RootState } from '../../../index'

import {
  Admin,
  Home,
  Info,
  Label,
  Projects,
  SoundLibrary,
  Venue,
  VenueArchive,
  VenueStage,
} from '../../../routes'

ReactGA.initialize('UA-163585797-1')

function App(): ReactElement {
  const { contentItems, currentContentItem, currentlyOpenPopUp, topBarCollapsed } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const history = useHistory()

  const genericRoutedPopups = [
    { basePath: 'label', id: 'detail-popup' },
    { basePath: 'projects', id: 'detail-popup' },
    { basePath: 'sound-library', id: 'detail-popup' },
    { basePath: 'venue-calendar', id: 'detail-popup' },
    { basePath: 'venue-archive', id: 'detail-popup' },
  ]

  useEffect(function fetchContent() {
    dispatch(requestReadItems({ page: 1, size: 10000 }))
  }, [])

  useEffect(function setActiveLiveStream() {
    dispatch(requestActiveLiveStream())

    const liveStreamStatePoll = window.setInterval(function pollForLiveStreamState() {
      dispatch(requestActiveLiveStream())
    }, 30000)

    return function cleanup() {
      window.clearInterval(liveStreamStatePoll)
    }
  }, [])

  useEffect(function getCartFromCookies() {
    const cartCookie = Cookies.get('hem-rocks-cart')
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
    <div className="hem-application">
      <ScrollToTop />

      <TopBar collapsed={topBarCollapsed} />

      <nav className={`main-nav${pathname === '/' ? ' large-nav' : ''}`}>
        <ul className="main-nav-items">
          <MainNavItem name="Sound Library" />
          <MainNavItem name="Label" />
          <MainNavItem name="Venue" to="venue-calendar" />
          <MainNavItem name="Apps" />
          <li className="main-nav-item">
            <NavLink
              to={(() => {
                const [tag, filter, filterName] = pathname.replace(/^\//, '').split('/')

                if (filter === 'filter') {
                  return `/${tag}/cart/${filterName}`
                }

                return `${pathname !== '/' ? pathname : ''}/cart`
              })()}
              onClick={() => dispatch(collapseTopBar())}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className="hamburger-nav">
        <HamburgerMenu>
          <ul>
            <MainNavItem name="Info" />
            <MainNavItem name="Merch" />
            <MainNavItem name="Mixes" />
            <MainNavItem name="Mailing List" />
            <ElectronOnly>
              <MainNavItem name="Admin" to="admin/list" />
            </ElectronOnly>
          </ul>
        </HamburgerMenu>
      </nav>
      <main className="main-content">
        <div className="tabs-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Home} />
            <Route exact path="/thank-you" component={Home} />

            <Route exact path="/info" component={Info} />
            <Route exact path="/info/cart" component={Info} />

            <Route exact path="/label/:contentItemSlug?/:filter?" component={Label} />
            <Route exact path="/label/filter/:filter" component={Label} />
            <Route exact path="/label/cart/:filter?" component={Label} />

            <Route exact path="/apps/:contentItemSlug?/:filter?" component={Projects} />
            <Route exact path="/apps/filter/:filter" component={Projects} />
            <Route exact path="/apps/cart/:filter?" component={Projects} />

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
      <footer>

      </footer>

      <PopupContainer
        closeIcon={CloseButton}
        id="detail-popup"
      >
        <DetailPopUp
          contentItem={currentContentItem}
          filter={pathname.split('/')[3]}
          tag={pathname.split('/')[1]}
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
        id="email-popup"
      >
        <EmailForm />
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
    </div>
  )
}

export default App
