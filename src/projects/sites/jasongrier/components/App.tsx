import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import DefaultSeoMeta from './DefaultSeoMeta'
import InfoSheet from './InfoSheet'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <header>
        <h1>Jason Aaron Grier</h1>
      </header>
      <main>
        <div>

        </div>
        <ul>
          <li></li>
        </ul>
      </main>
      <section className="info-sheet-container">
        <Switch>
          <Route exact path="/" component={DefaultSeoMeta} />
          <Route exact path="/:articleId" component={InfoSheet} />
        </Switch>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default App
