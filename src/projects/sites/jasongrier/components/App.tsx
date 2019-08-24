import React, { ReactElement } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import InfoSheet from './InfoSheet'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <header>
        <h1>Jason Aaron Grier</h1>
      </header>
      <main>
        <div>
          <Link to="/">home</Link><br/>
          <Link to="/foo">foo</Link><br/>
          <Link to="/bar">bar</Link>
        </div>
        <ul>
          <li></li>
        </ul>
      </main>
      <section className="info-sheet-container">
        <Switch>
          {/* TODO: This should be one route?? */}
          <Route exact path="/" component={InfoSheet} />
          <Route exact path="/:articleId" component={InfoSheet} />
        </Switch>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default App
