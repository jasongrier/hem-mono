import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Displace } from './layout'

import {
  Home,
  SoundLibraryHome,
} from '../routes'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <header className="site-header">
        <Displace preset="black-diamond">
          <h1>
            <span>HEM</span>
          </h1>
        </Displace>
      </header>
      <main>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/sound-library" component={SoundLibraryHome} />
        </Switch>
      </main>
      <div className="site-footer">

      </div>
    </div>
  )
}

export default App
