import React, { ReactElement, useEffect, useState } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//@ts-ignore
import smoothscroll from 'smoothscroll-polyfill'
import useWindowSize from '@rooks/use-window-size'
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
  Funding,
  Home,
  Nominate,
  Poem,
  Read,
} from '../routes'

smoothscroll.polyfill()

function App(): ReactElement {
  const { mobileNavOpen } = useSelector((state: RootState) => ({
    mobileNavOpen: state.app.mobileNavOpen,
  }))

  const dispatch = useDispatch()

  const { innerWidth } = useWindowSize()

  const [windowSizeWarningDismissed, setWindowSizeWarningDismissed] = useState<boolean>(false)

  function handleEsc(evt: any) {
    if (evt.keyCode === 27) {
      dispatch(setMobileNavOpen(false))
    }
  }

  function dismissWindowSizeWarning() {
    setWindowSizeWarningDismissed(true)
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="hem-application">
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

        {/* TODO: Move PoemNav out of the Switch/Route and directly into the Poem component */}
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
          <Route exact path="/funding" component={Funding} />
          <Route exact path="/poem/:poemUrl" component={Poem} />
        </Switch>
      </main>
      <footer className="site-footer">
        <Hide from="/poem/:poemUrl">
          <>
            <CampaignMonitorForm
              labelForName="Newsletter &nbsp;🚀"
              submitButtonText="Submit"
            />
            <a
              href="http://patreon.com/midstpoetry"
              className="patreon-logo"
            />
          </>
        </Hide>
      </footer>

      {windowSizeWarningDismissed === false && innerWidth && innerWidth < 600 && (
        <div className="window-size-popup">
          <h2>Hi there!</h2>
          <p>It looks like you might be viewing this site on a screen for which Midst is unfortunately not optimised.</p>
          <p>Consider coming back with a larger device.</p>
          <p>
            Or click <a href="#" onClick={dismissWindowSizeWarning}>here</a> to continue.
          </p>
        </div>
      )}
    </div>
  )
}

export default App
