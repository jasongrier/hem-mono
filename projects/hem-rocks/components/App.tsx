import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import { CampaignMonitorForm, HamburgerMenu } from '../../../lib/components'
import { Displace } from './layout'

import {
  Home,
  SoundLibraryHome,
} from '../routes'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <header className="site-header">
        <Displace preset="black-diamond">
          <h1>
            <span>HEM</span>
          </h1>
        </Displace>
        <HamburgerMenu>
          <section className="hem-mega-menu-content">
            <div className="hem-mega-menu-content-column">
              <h2 className="hem-mega-menu-big-logo">
                <span>HEM</span>
              </h2>
            </div>
            <div className="hem-mega-menu-content-column">
              <h3 className="big-heading">Sound Library</h3>
              <h4>Second Edition</h4>
              <ul>
                <li>Grand Piano</li>
                <li>Grand Piano: Extended</li>
                <li>Viola</li>
                <li>Noise Reduction Artefacts</li>
                <li>Seurat for Push</li>
                <li>Upcoming packs...</li>
              </ul>

              <h4>First Edition</h4>
              <p>
                Available until April 2nd, 2020<br/>
                <a href="#">Click here to download</a>
              </p>
            </div>
            <div className="hem-mega-menu-content-column">
              <h3>Apps &amp; Projects</h3>
              <ul>
                <li>Midst</li>
                <li>Seurat</li>
                <li>Luc</li>
                <li>Studio Tools</li>
              </ul>

              <h3 className="solo-heading">
                Archive
              </h3>

              <h3 className="small-heading">About</h3>
              <p className="small-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam urna et est accumsan, vitae faucibus tortor faucibus.</p>

              <h3 className="small-heading">Contact</h3>
              <CampaignMonitorForm
                hasNameField={false}
                id=""
                labelForEmail=""
                labelForName=""
              />
              <ul className="social-links small-text">
                <li className="instagram">Instagram</li>
                <li className="twitter">Twitter</li>
                <li className="facebook">Facebook</li>
              </ul>
            </div>
          </section>
        </HamburgerMenu>
      </header>
      <main>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/sound-library" component={SoundLibraryHome} />
        </Switch>
      </main>
      <div className="site-footer">

      </div>
    </div>
  )
}

export default App
