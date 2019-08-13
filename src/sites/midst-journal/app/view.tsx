import React, { ReactElement } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { About } from './components/about'
import { Contact } from './components/contact'
import { Faq } from './components/faq'
import { FaqForPoets } from './components/faq-for-poets'
import { Home } from './components/home'
import { Nominate } from './components/nominate'
import { Read } from './components/read'
import { TableOfContents } from './components/table-of-contents'
import { TheApp } from './components/the-app'
import './style.css'

function AppView(): ReactElement {
  return (
    <div className="hem-application">
      <header>
        <h1>Midst</h1>
        <nav>
          <Link to="/read">Read</Link>
          <Link to="/nominate">Nominate</Link>
          <Link to="/app">App</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">?</Link>
        </nav>
      </header>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/faq-for-poets" component={FaqForPoets} />
        <Route exact path="/" component={Home} />
        <Route exact path="/nominate" component={Nominate} />
        <Route exact path="/read" component={Read} />
        <Route exact path="/table-of-contents" component={TableOfContents} />
        <Route exact path="/app" component={TheApp} />
      </Switch>
    </div>
  )
}

export default AppView
