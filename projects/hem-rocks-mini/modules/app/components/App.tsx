import React, { ReactElement, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Home } from '../../../routes'
import { BuyPopUp } from '../../products'
import { PopupContainer } from '../../../../../lib/modules/popups'
import { RootState } from '../../../index'

function App(): ReactElement {
  const { activated, currentlyOpenPopUp, popupData } = useSelector((state: RootState) => ({
    activated: state.app.activated,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    popupData: state.popups.popupData,
  }))

  return (
    <div className={`
      hem-application
      ${activated ? ' app-activated' : ''}
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
