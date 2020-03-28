import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from '../../../routes'
import { BuyPopUp } from '../../products'
import PopupContainer from './PopupContainer'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <PopupContainer>
        {function renderToPopupContainer(payload: any) {
          return <BuyPopUp product={payload} />
        }}>
      </PopupContainer>
    </div>
  )
}

export default App
