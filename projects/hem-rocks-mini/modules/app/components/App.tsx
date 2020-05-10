import React, { ReactElement, useEffect } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { find } from 'lodash'
import ReactGA from 'react-ga'
import { CartPopup } from '../../cart'
import { ThankYouPopup } from '../../cart'
import { DetailPopUp, setCurrentContentItem } from '../../content'
import { ScrollToTop } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../../lib/modules/popups'
import { usePrevious } from '../../../../../lib/hooks'
import { collapseTopBar, expandTopBar, MainNavItem, PlayerBar, TopBar } from '../index'
import { RootState } from '../../../index'
import EmailForm from './EmailForm'

import {
  Home,
  Info,
  Label,
  Projects,
  SoundLibrary,
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
  ]

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
        dispatch(setCurrentContentItem(requestedContentItem))
      }

      dispatch(openPopup(popupId))
    }
  }, [pathname])

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

      else if (
        pathnameSplit[0] === 'label'
        || pathnameSplit[0] === 'projects'
        || pathnameSplit[0] === 'sound-library'
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

  return (
    <div className="hem-application">
      <ScrollToTop />

      <TopBar collapsed={topBarCollapsed} />

      <nav className="main-nav no-burger">
        <ul className="main-nav-items">
          <MainNavItem name="Sound Library" />
          <MainNavItem name="Label" />
          <MainNavItem name="Info" />
          {/* <MainNavItem name="Projects" /> */}
          <MainNavItem name="Cart" additive={pathname !== '/'} />
        </ul>
        {/* <HamburgerMenu>
          <ul>
            <MainNavItem name="Info" />
            <MainNavItem name="Merch" />
            <MainNavItem name="Mixes" />
            <MainNavItem name="Mailing List" />
          </ul>
        </HamburgerMenu> */}
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

            <Route exact path="/projects/:contentItemSlug?/:filter?" component={Projects} />
            <Route exact path="/projects/filter/:filter" component={Projects} />
            <Route exact path="/projects/cart/:filter?" component={Projects} />

            <Route exact path="/sound-library/:contentItemSlug?/:filter?" component={SoundLibrary} />
            <Route exact path="/sound-library/filter/:filter" component={SoundLibrary} />
            <Route exact path="/sound-library/cart/:filter?" component={SoundLibrary} />
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
        closeIcon={CloseButton}
        id="cart-popup"
      >
        {(props: any) => (
          <CartPopup
            redirecting={props?.redirecting}
            returnUrl={props?.returnUrl}
          />
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
        <ThankYouPopup />
      </PopupContainer>

      <PlayerBar />
    </div>
  )
}

export default App
