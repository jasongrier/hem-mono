import React, { ReactElement, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { WebsitePlayer } from './packages/website-player'
import { logInCheckRequest } from '../store/actions'
import { RootState } from '../store'

import {
  Home,
} from '../routes/flagship'

import {
  SoundLibraryHome,
} from '../routes/sound-library'

import {
  HandbookHome,
  UsingMidstWidgets,
} from '../routes/handbook'

import {
  DemosHome,
} from '../routes/demos'

import {
  FourOhFour,
  LogOut,
} from '../routes/utility'

function App(): ReactElement {
  const { stuckPencil, stuckPlayer } = useSelector((state: RootState) => ({
    stuckPencil: state.app.stuckPencil,
    stuckPlayer: state.app.stuckPlayer,
  }))

  const dispatch = useDispatch()

  // TODO: "logIn" or "login" or "loggedIn"??
  useEffect(function logInCheck() {
    dispatch(logInCheckRequest())
  }, [])

  return (
    <div className={classnames({
      'hem-application': true,
      'pencil-stuck': stuckPencil,
      'website-player-stuck': stuckPlayer,
    })}>
      <WebsitePlayer />

      <Switch>
        {/* Flagship pages */}
        <Route exact path="/" component={Home} />
        <Route exact path="/sound-library" component={SoundLibraryHome} />

        {/* Demo pages */}
        <Route exact path="/demos" component={DemosHome} />

        {/* Internal pages */}
        <Route exact path="/handbook" component={HandbookHome} />
        <Route exact path="/handbook/using-midst-widgets" component={UsingMidstWidgets} />

        {/* Utility pages */}
        <Route exact path="/log-out" component={LogOut} />
        <Route exact path="*" component={FourOhFour} />
      </Switch>
    </div>
  )
}

export default App
