import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home } from '../../../routes'
import { BuyPopUp } from '../../products'
import { PopupContainer } from '../../../../../lib/modules/popups'
import { RootState } from '../../../index'

function App(): ReactElement {
  const { currentlyOpenPopUp, popupPayload } = useSelector((state: RootState) => ({
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    popupPayload: state.popups.popupPayload,
  }))

  return (
    <div className="hem-application">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <PopupContainer isOpen={currentlyOpenPopUp === 'buy-pop-up'}>
        <BuyPopUp product={popupPayload} />
      </PopupContainer>
    </div>
  )
}

export default App
