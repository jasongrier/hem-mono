import React, { ReactElement } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Home from '../routes/Home'
import Tree from '../routes/Tree'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Helmet>
        <title>Midst</title>
        <meta name="description" content="" />
      </Helmet>

      <header>
        <h1>
          <Link to="/">HEM Studio</Link>
        </h1>
        <nav>
          <NavLink to="/">Table of Contents</NavLink>
          <NavLink to="/demos">Demos</NavLink>
        </nav>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tree" component={Tree} />
        </Switch>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
