import React, { ReactElement } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Hide } from '../../../../common/components'
import CampaignMonitorForm from '../components/CampaignMonitorForm'
import Shapes from '../components/Shapes'
import PoemNav from '../components/PoemNav'
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
import ProcessNote from './ProcessNote'

function App(): ReactElement {
  const { mobileNavOpen } = useSelector((state: RootState) => ({
    mobileNavOpen: state.app.mobileNavOpen,
  }))

  const dispatch = useDispatch()

  return (
    <div className="hem-application">
      <Helmet>
        <title>Midst</title>
        <meta name="description" content="" />
      </Helmet>

      <Route render={(props) => <Shapes {...props} />} />
      <Route
        path="/poem/:slug"
        render={(props) => <ProcessNote {...props} />}
      />

      <header className="site-header">
        <Hide from="/poem/:slug">
          <h1>
            <Link to="/">Midst</Link>
          </h1>
          <h1 className='mini-logo'>
            <Link to="/">Midst</Link>
          </h1>
        </Hide>

        <div
          className={mobileNavOpen ? 'open' : ''}
          id="mobile-nav-toggle"
          onClick={() => dispatch(setMobileNavOpen(!mobileNavOpen))}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Switch>
          <Route exact path="/poem/:slug" component={PoemNav} />
        </Switch>

        <nav
          className={mobileNavOpen ? 'open' : ''}
          onClick={() => dispatch(setMobileNavOpen(false))}
        >
          <Hide from="/poem/:slug">
            <SiteNavLinks />
          </Hide>
          <Hide from="/poem/:slug">
            <NavLink
              className="about-link--desk"
              activeClassName="active"
              to="/about"
            >?</NavLink>
            <NavLink
              className="about-link--desk light"
              activeClassName="active"
              to="/about"
            >?</NavLink>
          </Hide>
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
        <Hide from="/poem/:slug">
          <CampaignMonitorForm
            labelForName="Newsletter &nbsp;🚀"
            submitButtonText="Submit"
          />
        </Hide>
      </footer>
    </div>
  )
}

export default App
