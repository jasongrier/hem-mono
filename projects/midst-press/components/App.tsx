import React, { ReactElement, useEffect } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Hide } from '../../../lib/components'
import CampaignMonitorForm from '../components/CampaignMonitorForm'
import Shapes from '../components/Shapes'
import PoemNav from '../components/PoemNav'
import SiteNavLinks from '../components/SiteNavLinks'
import { RootState } from '../store'
import { setMobileNavOpen } from '../store/actions'
import ProcessNote from './ProcessNote'
import LogoSvg from './LogoSvg'

import {
  About,
  AboutTheApp,
  Contact,
  Faq,
  FaqForPoets,
  Home,
  Nominate,
  Poem,
  Read,
} from '../routes'

function App(): ReactElement {
  const { mobileNavOpen } = useSelector((state: RootState) => ({
    mobileNavOpen: state.app.mobileNavOpen,
  }))

  const dispatch = useDispatch()

  function handleEsc(evt: any) {
    if (evt.keyCode === 27) {
      dispatch(setMobileNavOpen(false))
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="hem-application">
      <Helmet>
        <title>Midst</title>
        <meta name="description" content="" />
      </Helmet>

      <Route render={(props) => <Shapes {...props} />} />

      <Route
        path="/poem/:poemUrl"
        render={(props) => <ProcessNote {...props} />}
      />

      <header className="site-header">
        <h1>
          <Link to="/">
            <span>Midst</span>
            <Route render={(props) => <LogoSvg {...props} />} />
          </Link>
        </h1>

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
          <Route exact path="/poem/:poemUrl" component={PoemNav} />
        </Switch>

        <nav
          className={mobileNavOpen ? 'open' : ''}
          onClick={() => dispatch(setMobileNavOpen(false))}
        >
          <Route render={(props) => <SiteNavLinks {...props} />} />

          <Hide from="/poem/:poemUrl">
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
          <Route exact path="/poem/:poemUrl" component={Poem} />
        </Switch>
      </main>
      <footer className="site-footer">
        <Hide from="/poem/:poemUrl">
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