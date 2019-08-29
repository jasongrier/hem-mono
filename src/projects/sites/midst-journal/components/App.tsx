import React, { ReactElement } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Hide } from '../../../../common/components'
import CampaignMonitorForm from '../components/CampaignMonitorForm'
import Shapes from '../components/Shapes'
import PoemNavLink from '../components/PoemNavLink'
import SiteNavLinks from '../components/SiteNavLinks'
import About from '../routes/About'
import Contact from '../routes/Contact'
import Faq from '../routes/Faq'
import FaqForPoets from '../routes/FaqForPoets'
import Home from '../routes/Home'
import Nominate from '../routes/Nominate'
import Poem from '../routes/Poem'
import Read from '../routes/Read'
import AboutTheApp from '../routes/AboutTheApp'
import { RootState } from '../store'
import { setMobileNavOpen } from '../store/actions'

function App(): ReactElement {
  const { mobileNavOpen } = useSelector((state: RootState) => ({
    mobileNavOpen: state.app.mobileNavOpen,
  }))

  const dispatch = useDispatch()

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

        <div
          id="mobile-nav-toggle"
          onClick={() => dispatch(setMobileNavOpen(!mobileNavOpen))}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Switch>
          <Route exact path="/poem/:slug" component={PoemNavLink} />
        </Switch>

        <nav
          className={mobileNavOpen ? 'open' : ''}
          onClick={() => dispatch(setMobileNavOpen(false))}
        >
          <Hide on="/poem/:slug">
            <SiteNavLinks />
          </Hide>
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
        <Hide on="/">
          <CampaignMonitorForm
            labelForName="Join us?"
            submitButtonText="Sign up!"
          />
        </Hide>
      </footer>
    </div>
  )
}

export default App
