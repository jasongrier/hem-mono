import React, { ReactElement, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'
import { debounce } from 'lodash'
import { Home } from '../../../routes'
import { BuyPopUp } from '../../products'
import { PopupContainer } from '../../../../../lib/modules/popups'
import { RootState } from '../../../index'
import { setTopBarCollapsed } from '../actions'

function App(): ReactElement {
  const {
    activated,
    currentTag,
    topBarCollapsed,

    currentlyOpenPopUp,
    popupData,
  } = useSelector((state: RootState) => ({
    activated: state.app.activated,
    currentTag: state.app.currentTag,
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
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
      <PopupContainer isOpen={currentlyOpenPopUp === 'buy-pop-up'}>
        <BuyPopUp product={popupData} />
      </PopupContainer>
    </div>
  )
}

export default App
