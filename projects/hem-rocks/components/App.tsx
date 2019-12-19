import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
  SoundLibrary,
} from '../routes'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sound-library" component={SoundLibrary} />
      </Switch>
    </div>
  )
}

export default App
