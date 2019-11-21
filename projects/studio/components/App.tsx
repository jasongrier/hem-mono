import React, { ReactElement } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Hide } from '../../../../common/components'
import DemoMovies from '../routes/demos/DemoMovies'
import Midi from '../routes/demos/Midi'
import Home from '../routes/Home'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Helmet>
        <title>Studio</title>
        <meta name="description" content="" />
      </Helmet>

      <Hide from="/demo-movies/:name">
        <header>
          <h1>
            <Link to="/">HEM Studio</Link>
          </h1>
          <nav>
            <NavLink to="/">Table of Contents</NavLink>
            <NavLink to="/demos">Demos</NavLink>
          </nav>
        </header>
      </Hide>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/demo-movies/:name" component={DemoMovies} />
          <Route exact path="/demo-midi" component={Midi} />
        </Switch>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
