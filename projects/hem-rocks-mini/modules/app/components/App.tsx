import React, { ReactElement, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'
import { BuyPopUp } from '../../products'
import { PopupContainer } from '../../../../../lib/modules/popups'
import { MainNavItem, TopBar } from '../../../components'
import { GrandPianoHeroineAlternate } from '../../../components/heroines'
import { RootState } from '../../../index'
import { setTopBarCollapsed } from '../actions'

import {
  Info,
  Label,
  Projects,
  SoundLibrary,
} from '../../../routes'

function App(): ReactElement {
  const {
    activated,
    topBarCollapsed,

    currentlyOpenPopUp,
    popupData,
  } = useSelector((state: RootState) => ({
    activated: state.app.activated,
    topBarCollapsed: state.app.topBarCollapsed,

    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    popupData: state.popups.popupData,
  }))

  const dispatch = useDispatch()

  useEffect(function checkOnInit() {
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
        <GrandPianoHeroineAlternate />
      </div>

      <nav className="main-nav">
        <ul>
          <MainNavItem name="Sound Library" />
          <MainNavItem name="Label" />
          <MainNavItem name="Projects" />
          <MainNavItem name="Info" />
        </ul>
      </nav>

      <div className="pricing-banner" hidden>
        Pay what you can. All devices run in Ableton Live Lite
      </div>

      <div className="sub-heroine new-devices-heroine" hidden>
        <h2>New Devices</h2>
        <div className="sub-heroine-columns">
          <div className="sub-heroine-column">
            {/* <ProductTile
              title="Seurat 2"
              featureList={[
                'Supports multiple Seurat devices per track for more complex patterns',
                'Generates both completely random and semi-random melodic patterns',
                'Works entirely in Live Lite', // TODO: Place  repeated string in config
              ]}
              imgSrc=""
              imgAlt=""
              productId=""
              videoPopUpId=""
            /> */}
          </div>
          <div className="sub-heroine-column">
            {/* <ProductTile
              title="Chord Brush"
              featureList={[
                'Supports multiple Seurat devices per track for more complex patterns',
                'Generates both completely random and semi-random melodic patterns',
                'Works entirely in Live Lite', // TODO: Place  repeated string in config
              ]}
              imgSrc=""
              imgAlt=""
              productId=""
              videoPopUpId=""
            /> */}
          </div>
          <div className="sub-heroine-column">
            {/* <ProductTile
              title="Voice Splitter"
              featureList={[
                'Takes a single melody line and passes it around to different instruments',
                'Can go note-by-note or according to various patterns',
                'Works entirely in Live Lite', // TODO: Place  repeated string in config
              ]}
              imgSrc=""
              imgAlt=""
              productId=""
              videoPopUpId=""
            /> */}
          </div>
        </div>
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
      <PopupContainer id="buy-popup">
        <BuyPopUp product={popupData} />
      </PopupContainer>
    </div>
  )
}

export default App
