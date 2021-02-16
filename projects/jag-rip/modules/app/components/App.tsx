import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  ReactConsulting,
} from '../../../routes'

function App(): ReactElement {
  return (
    <div className="hem-application jag-rip">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/react-consulting" component={ReactConsulting} />
      </Switch>
    </div>
  )
}

export default App
