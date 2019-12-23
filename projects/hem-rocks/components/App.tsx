import React, { ReactElement, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logInCheckRequest } from '../store/actions'

import {
  Home,
  LogOut,
  SoundLibrary,
} from '../routes'

import {
  InternalHome,
  MidstWidgets,
} from '../routes/internal'

import {
  DemosHome,
  MidstJavascriptWidgetDemo,
} from '../routes/demos'

function App(): ReactElement {
  const dispatch = useDispatch()

  // TODO: "logIn" or "login" or "loggedIn"??
  useEffect(function logInCheck() {
    dispatch(logInCheckRequest())
  }, [])

  return (
    <div className="hem-application">
      <Switch>
        {/* Landing pages */}
        <Route exact path="/" component={Home} />
        <Route exact path="/sound-library" component={SoundLibrary} />

        {/* Demo pages */}
        <Route exact path="/demos" component={DemosHome} />
        <Route exact path="/demos/midst-javascript-widget" component={MidstJavascriptWidgetDemo} />

        {/* Internal pages */}
        <Route exact path="/internal" component={InternalHome} />
        <Route exact path="/internal/midst-widgets" component={MidstWidgets} />

        {/* Utility pages */}
        <Route exact path="/log-out" component={LogOut} />
        <Route exact path="*" component={FourOhFour} />
      </Switch>
    </div>
  )
}

export default App
