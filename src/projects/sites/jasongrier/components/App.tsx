import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import Cv from '../routes/Cv'
import Home from '../routes/Home'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Switch>
        <Route path="/cv" component={ Cv } />
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  )
}

export default App
