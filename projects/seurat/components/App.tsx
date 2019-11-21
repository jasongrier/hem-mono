import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Home from '../routes/Home'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Helmet>
        <title>Seurat</title>
        <meta name="description" content="" />
      </Helmet>

      <header className="site-header">
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
      <footer className="site-footer">
      </footer>
    </div>
  )
}

export default App
