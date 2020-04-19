import React, { ReactElement, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReactGA from 'react-ga'
import { CartPopup } from '../../cart'
import { DetailPopUp, PostDownloadPopup } from '../../content'
import { EmailForm } from './index'
import { HamburgerMenu, ScrollToTop } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { collapseTopBar, MainNavItem, TopBar } from '../index'
import { RootState } from '../../../index'

import {
  Home,
  Info,
  Label,
  Projects,
  SoundLibrary,
} from '../../../routes'

ReactGA.initialize('UA-163585797-1')

function App(): ReactElement {
  const { currentContentItem, topBarCollapsed } = useSelector((state: RootState) => ({
    currentContentItem: state.content.currentContentItem,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    if (window.location.pathname !== '/') {
      // TODO: collapseTopBar is deprecated
      dispatch(collapseTopBar())
    }
  }, [])

  const { pathname } = useLocation()

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
          <li className="main-nav-item">
            <a onClick={() => dispatch(openPopup('cart-popup'))}>
              Cart
            </a>
          </li>
        </ul>
        {/* <HamburgerMenu>
          <ul></ul>
        </HamburgerMenu> */}
      </nav>

      <main className="main-content">
        <div className="tabs-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/info" component={Info} />
            <Route exact path="/label" component={Label} />
            {/* <Route exact path="/projects" component={Projects} /> */}
            <Route exact path="/sound-library" component={SoundLibrary} />
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

      <PopupContainer
        id="post-download-popup"
        closeIcon={CloseButton}
      >
        <PostDownloadPopup />
      </PopupContainer>
    </div>
  )
}

export default App
