import React, { ReactElement, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CartPopup } from '../../cart'
import { DetailPopUp } from '../../content'
import { EmailPopup } from '../../app'
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

function App(): ReactElement {
  const { currentContentItem, topBarCollapsed } = useSelector((state: RootState) => ({
    currentContentItem: state.content.currentContentItem,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    if (window.location.pathname !== '/') {
      dispatch(collapseTopBar())
    }
  }, [])

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
        <EmailPopup />
      </PopupContainer>
    </div>
  )
}

export default App
