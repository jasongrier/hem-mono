import React, { ReactElement } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Displace, MegaMenu } from './layout'

import {
  Home,
  SoundLibraryHome,
} from '../routes'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <header className="site-header">
        <Displace
          random={true}
          rotate={1.5}
        >
          <h1>
            <span>
              <Link to="/">HEM</Link>
            </span>
          </h1>
        </Displace>
        <MegaMenu />
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
