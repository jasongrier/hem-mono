import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CampaignMonitorForm, HamburgerMenu } from '../../../../lib/components'
import { LogInForm } from '../ui'
import { RootState } from '../../store'

function App(): ReactElement {
  const { loggedIn } = useSelector((state: RootState) => ({
    loggedIn: state.app.loggedIn,
  }))

  return (
    <HamburgerMenu>
      {/* TODO: Remove `hem-` prefix */}
      <section className="hem-mega-menu-content">
        <div className="hem-mega-menu-content-column">
          <h2 className="hem-mega-menu-big-logo">
            <span>
              <Link to="/">HEM</Link>
            </span>
          </h2>
        </div>
        <div className="hem-mega-menu-content-column">
          <div className="hem-mega-menu-content-box">
            <h3 className="big-heading">
              <Link to="/sound-library">Sound Library</Link>
            </h3>
            <h4>
              <Link to="/sound-library">New packs in 2020</Link>
            </h4>
            <ul>
              <li>Grand Piano</li>
              <li>Viola</li>
              <li>Noise Reduction Artefacts</li>
              <li>Free Guitar</li>
              <li>Seurat 2</li>
            </ul>

            <h4>Old Packs</h4>
            <p>
              Available until February 14th, 2020<br/>
              <Link
                className="classic-link"
                to="/sound-library-first-edition">
                Click here to download
              </Link>
            </p>
          </div>
          <div className="hem-mega-menu-content-box">
            <h3 className="big-heading">
              <Link to="/sound-library">Apps &amp; Projects</Link>
            </h3>
            <ul>
              <li>Midst</li>
              <li>Seurat for MacOS and iOS</li>
              <li>Luc: Structured Audio</li>
              <li>Relineator</li>
              <li>React Components</li>
              <li>Lab&hellip;</li>
            </ul>
          </div>
          <div className="hem-mega-menu-content-box">
            <h3 className="big-heading">
              <Link to="/sound-library">Label</Link>
            </h3>
            <ul>
              <li>Discography</li>
              <li>Listen to the Archive</li>
            </ul>
          </div>
        </div>
        <div className="hem-mega-menu-content-column">
          <div className="hem-mega-menu-content-box">
            <h3 className="small-heading">About</h3>
            <p>
              HEM is an artistic research and technology studio focussed on experimental text and sound practices, based in Copenhagen.
            </p>

            <p>
              HEM started in 2016 as an independent record label with Ariel Pink, Julia Holter, Michael Pisaro, Lucrecia Dalt counting among its roster.
            </p>
          </div>

          <div className="hem-mega-menu-content-box">
            <h3 className="small-heading">Mailing list</h3>
            <ul>
              <li className="mailing-list-form">
                <CampaignMonitorForm
                  hasNameField={false}
                  id=""
                  labelForEmail=""
                  labelForName=""
                  placeholderText="Get updates in your inbox 🚀"
                  submitButtonText="Sign up"
                />
              </li>
            </ul>
            <h3 className="small-heading">Contact</h3>
            <ul>
              <li>
                <Link to="/about">info@hem.rocks</Link>
              </li>
              <li className="social-link instagram">NPM</li>
              <li className="social-link twitter">Github</li>
              <li className="social-link facebook">Instagram</li>
            </ul>
          </div>
          <div className="hem-mega-menu-internal-content-box">
            { loggedIn && (
              <>
                <h3 className="small-heading">Secret stuff</h3>
                <ul>
                  <li>
                    <Link to="/handbook">Handbook</Link>
                  </li>
                  <li>
                    <Link to="/log-out">Log out</Link>
                  </li>
                </ul>
              </>
            )}
            { !loggedIn && (
              <>
                <h3 className="small-heading">Log in</h3>
                <LogInForm />
              </>
            )}
          </div>
        </div>
      </section>
    </HamburgerMenu>
  )
}

export default App
