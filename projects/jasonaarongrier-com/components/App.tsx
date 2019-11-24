import React, { ReactElement } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Cv from '../routes/Cv'
import Home from '../routes/Home'
import Press from '../routes/Press'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cv" component={Cv} />
        <Route exact path="/press" component={Press} />
        {/* TODO: 404 page */}
      </Switch>
    </div>
  )
}

export default App
