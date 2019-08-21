import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import InfoSheet from './InfoSheet'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <header>

      </header>
      <main>

      </main>
      <section className="info-sheet-container">
        <Switch>
          <Route exact path="/:articleId" component={InfoSheet} />
        </Switch>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default App
