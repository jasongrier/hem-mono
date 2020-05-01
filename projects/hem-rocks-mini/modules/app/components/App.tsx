import React, { ReactElement, useEffect, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReactGA from 'react-ga'
import { CartPopup } from '../../cart'
import { DetailPopUp, PostDownloadPopup } from '../../content'
import { HamburgerMenu, ScrollToTop } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { collapseTopBar, MainNavItem, PlayerBar, TopBar } from '../index'
import { RootState } from '../../../index'

import {
  Home,
  Info,
  Label,
  Projects,
  SoundLibrary,
} from '../../../routes'
import EmailForm from './EmailForm'

ReactGA.initialize('UA-163585797-1')

function App(): ReactElement {
  const { currentContentItem, topBarCollapsed } = useSelector((state: RootState) => ({
    currentContentItem: state.content.currentContentItem,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  const [playerBarMinified, setPlayerBarMinified] = useState(true)

  const { pathname } = useLocation()

  useEffect(function init() {
    if (pathname !== '/') {
      dispatch(collapseTopBar())
    }
  }, [pathname])

  useEffect(function trackPageView() {
    ReactGA.pageview(pathname)
  }, [pathname])

  useEffect(function playerBarMinifiedState() {
    setPlayerBarMinified(pathname === '/')
  }, [pathname])

  return (
    <div className="hem-application">
      <ScrollToTop />

      <TopBar collapsed={topBarCollapsed} />

      <nav className={`main-nav no-burger${pathname === '/' ? ' large-nav' : ''}`}>
        <ul className="main-nav-items">
          <MainNavItem name="Sound Library" />
          <MainNavItem name="Label" />
          <MainNavItem name="Venue" />
          <MainNavItem name="Software" />
          <MainNavItem name="Info" />
          <li className="main-nav-item">
            <a onClick={() => dispatch(openPopup('cart-popup'))}>
              Cart
            </a>
          </li>
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
            <Route exact path="/info" component={Info} />
            <Route exact path="/label/:filter?" component={Label} />
            <Route exact path="/projects/:filter?" component={Projects} />
            <Route exact path="/sound-library/:filter?" component={SoundLibrary} />
          </Switch>
        </div>
      </main>
      <footer>

      </footer>

      { currentContentItem && (
        <>
          <PopupContainer
            id="detail-popup"
            closeIcon={CloseButton}
          >
            <DetailPopUp contentItem={currentContentItem} />
          </PopupContainer>

          <PopupContainer
            id="detail-popup-hidden-purchase-form"
            closeIcon={CloseButton}
          >
            <DetailPopUp
              contentItem={currentContentItem}
              showPurchaseForm={false}
            />
          </PopupContainer>
        </>
      )}

      <PopupContainer
        id="cart-popup"
        closeIcon={CloseButton}
      >
        <CartPopup />
      </PopupContainer>

      <PopupContainer
        id="email-popup"
        closeIcon={CloseButton}
      >
        <EmailForm />
      </PopupContainer>

      { currentContentItem && (
        <PopupContainer
          id="post-download-popup"
          closeIcon={CloseButton}
        >
          <PostDownloadPopup download={currentContentItem} />
        </PopupContainer>
      )}

      <PlayerBar />
    </div>
  )
}

export default App
