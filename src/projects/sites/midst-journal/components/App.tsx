import React, { ReactElement } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { useDocumentTitle } from '../../../../common/hooks'
import CampaignMonitorForm from '../components/CampaignMonitorForm'
import Shapes from '../components/Shapes'
import About from '../routes/About'
import Contact from '../routes/Contact'
import Faq from '../routes/Faq'
import FaqForPoets from '../routes/FaqForPoets'
import Home from '../routes/Home'
import Nominate from '../routes/Nominate'
import Read from '../routes/Read'
import TableOfContents from '../routes/TableOfContents'
import AboutTheApp from '../routes/AboutTheApp'

function App(): ReactElement {
  useDocumentTitle('Midst Journal')

  return (
    <div className="hem-application">
      <Shapes />
      <header className="site-header">
        <h1>
          <Link to="/">Midst</Link>
        </h1>
        <nav>
          <Link to="/read">Read</Link>
          <Link to="/nominate">Nominate</Link>
          <Link to="/app">App</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">?</Link>
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
          <Route exact path="/table-of-contents" component={TableOfContents} />
          <Route exact path="/app" component={AboutTheApp} />
        </Switch>
      </main>
      <footer>
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
