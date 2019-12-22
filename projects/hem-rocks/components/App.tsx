import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
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
      </Switch>
    </div>
  )
}

export default App
