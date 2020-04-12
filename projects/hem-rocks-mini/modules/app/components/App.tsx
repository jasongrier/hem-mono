import React, { ReactElement, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'
import { CartPopup } from '../../cart'
import { DetailPopUp } from '../../content'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { MainNavItem, TopBar } from '../../../components'
import { GrandPianoHeroine } from '../../../components/heroines'
import { setTopBarCollapsed } from '../actions'
import { RootState } from '../../../index'

import {
  Info,
  Label,
  Projects,
  SoundLibrary,
} from '../../../routes'

function App(): ReactElement {
  const { activated, currentContentItem, topBarCollapsed } = useSelector((state: RootState) => ({
    activated: state.app.activated,
    currentContentItem: state.content.currentContentItem,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    checkScrollTop()
  }, [])

  useEffect(function scrollSpy() {
    $(window).on('scroll', checkScrollTop)
  }, [topBarCollapsed])

  function checkScrollTop() {
    const scrollTop = $(window).scrollTop()

    if (!scrollTop) return

    if (scrollTop >= 665 && !topBarCollapsed) {
      dispatch(setTopBarCollapsed(true))
    }

    else if (scrollTop < 665 && topBarCollapsed) {
      dispatch(setTopBarCollapsed(false))
    }
  }

  return (
    <div className={`
      hem-application
      ${activated ? ' app-activated' : ''}
      ${topBarCollapsed ? ' top-bar-collapsed' : ''}
    `}>
      <TopBar collapsed={topBarCollapsed} />

      <div className="main-heroine">
        <GrandPianoHeroine />
      </div>

      <nav className="main-nav">
        <ul>
          <MainNavItem name="Sound Library" />
          <MainNavItem name="Label" />
          <MainNavItem name="Projects" />
          <li className="main-nav-item">
            <a onClick={() => dispatch(openPopup('cart-popup'))}>
              Cart
            </a>
          </li>
        </ul>
      </nav>

      <div className="pricing-banner" hidden>
        Pay what you can. All devices run in Ableton Live Lite
      </div>

      <main className="main-content">
        <div className="tabs-content">
          <Switch>
            <Route exact path="/info" component={Info} />
            <Route exact path="/label" component={Label} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/sound-library" component={SoundLibrary} />
          </Switch>
        </div>
      </main>
      <PopupContainer
        id="detail-popup"
        closeIcon={CloseButton}
      >
        <DetailPopUp contentItem={currentContentItem} />
      </PopupContainer>
      <PopupContainer
        id="cart-popup"
        closeIcon={CloseButton}
      >
        <CartPopup />
      </PopupContainer>
    </div>
  )
}

export default App
