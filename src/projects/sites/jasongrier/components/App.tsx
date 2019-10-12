import React, { ReactElement } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Home from '../routes/Home'
import Cv from '../routes/Cv'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Helmet>
        <title>Jason Grier</title>
        <meta name="description" content="" />
      </Helmet>

      <header className="site-header">
        <h1>
          <Link to="/">Jason Grier</Link>
        </h1>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cv" component={Cv} />
        </Switch>
      </main>
      <footer className="site-footer">
      </footer>
    </div>
  )
}

export default App
