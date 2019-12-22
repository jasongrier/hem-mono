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
              <Link to="/sound-library">Second Edition</Link>
            </h4>
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
              Available until February 14th, 2020<br/>
              <Link
                className="classic-link"
                to="/sound-library-first-edition">
                Click here to download
              </Link>
            </p>
          </div>
        </div>
        <div className="hem-mega-menu-content-column">
          <div className="hem-mega-menu-content-box">
            <h3 className="small-heading">Apps &amp; Projects</h3>
            <ul>
              <li>Midst</li>
              <li>Seurat</li>
              <li>Luc</li>
              <li>Studio Tools</li>
            </ul>
          </div>

          <div className="hem-mega-menu-content-box">
            <h3 className="solo-heading">
              Archive
            </h3>
          </div>

          <div className="hem-mega-menu-content-box">
            <h3 className="small-heading">About</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam urna et est accumsan, vitae faucibus tortor faucibus.</p>
          </div>

          <div className="hem-mega-menu-content-box">
            <h3 className="small-heading">Contact</h3>
            <ul>
              <li>
                <Link to="/about">Send an email</Link>
              </li>
              <li className="mailing-list-form">
                Mailing list:<br/>
                <CampaignMonitorForm
                  hasNameField={false}
                  id=""
                  labelForEmail=""
                  labelForName=""
                  placeholderText="Enter email to receive updates"
                />
              </li>
              <li className="social-link instagram">Instagram</li>
              <li className="social-link twitter">Twitter</li>
              <li className="social-link facebook">Facebook</li>
            </ul>
          </div>
          <div className="hem-mega-menu-internal-content-box">
            { loggedIn && (
              <ul>
                <li>
                  <Link to="/internal">Internal pages...</Link>
                </li>
              </ul>
            )}
            { !loggedIn && (
              <LogInForm />
            )}
          </div>
        </div>
      </section>
    </HamburgerMenu>
  )
}

export default App
