import React, { ReactElement } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CampaignMonitorForm from '../components/CampaignMonitorForm'
import Shapes from '../components/Shapes'
import About from '../routes/About'
import Contact from '../routes/Contact'
import Faq from '../routes/Faq'
import FaqForPoets from '../routes/FaqForPoets'
import Home from '../routes/Home'
import Nominate from '../routes/Nominate'
import Poem from '../routes/Poem'
import Read from '../routes/Read'
import AboutTheApp from '../routes/AboutTheApp'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Helmet>
        <title>Midst Journal</title>
        <meta name="description" content="" />
      </Helmet>
      <Shapes />
      <header className="site-header">
        <h1>
          <Link to="/">Midst</Link>
        </h1>
        <nav>
          <NavLink activeClassName="active" to="/read">Read</NavLink>
          <NavLink activeClassName="active" to="/nominate">Nominate</NavLink>
          <NavLink activeClassName="active" to="/app">App</NavLink>
          <NavLink activeClassName="active" to="/contact">Contact</NavLink>
          <NavLink activeClassName="active" to="/about">?</NavLink>
        </nav>
      </header>
      <main>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/faq-for-poets" component={FaqForPoets} />
          <Route exact path="/" component={Home} />
          <Route exact path="/nominate" component={Nominate} />
          <Route exact path="/read" component={Read} />
          <Route exact path="/app" component={AboutTheApp} />
          <Route exact path="/poem/:slug" component={Poem} />
        </Switch>
      </main>
      <footer className="site-footer">
        {document.location.pathname !== '/' && (
          <CampaignMonitorForm
            labelForName="Join us?"
            submitButtonText="Sign up!"
          />
        )}
      </footer>
    </div>
  )
}

export default App
