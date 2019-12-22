import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
  LogOut,
  SoundLibrary,
} from '../routes'

import {
  InternalHome,
  MidstWidgets,
} from '../routes/internal'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sound-library" component={SoundLibrary} />
        <Route exact path="/internal" component={InternalHome} />
        <Route exact path="/internal/midst-widgets" component={MidstWidgets} />
        <Route exact path="/log-out" component={LogOut} />
      </Switch>
    </div>
  )
}

export default App
