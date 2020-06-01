import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CampaignMonitorForm, ElectronOnly, HamburgerMenu } from '../../../../lib/components'
import { setMegaNavOpen } from '../../modules/app'
import { Logo, MainNavItem } from './index'
import ReactGA from 'react-ga'
import { CAMPAIGN_MONITOR_FORM_ID } from '../../config'
import { RootState } from '../../index'

function MegaNav(): ReactElement {
  const { megaNavOpen } = useSelector((state: RootState) => ({
    megaNavOpen: state.app.megaNavOpen,
  }))

  const dispatch = useDispatch()

  const megaNavOnChange = useCallback(
    function megaNavOnChange(open) {
      dispatch(setMegaNavOpen(open))
    }, [],
  )

  return (
    <nav className="mega-nav">
      <HamburgerMenu
        controlled={true}
        open={megaNavOpen}
        onChange={megaNavOnChange}
      >
        <Logo />

        <div className="mega-nav-sections clearfix">
          <div className="mega-nav-section">
            <h3>Products</h3>
            <ul>
              <MainNavItem name="Apps" />
              <MainNavItem name="Sound Library" />
              <MainNavItem name="Label" />
              <MainNavItem name="Merch" />
            </ul>
          </div>

          <div className="mega-nav-section">
            <h3>Venue</h3>
            <ul>
              <MainNavItem name="Calendar" />
              <MainNavItem name="Archive" />
              <MainNavItem name="Merch Table" />
            </ul>
          </div>

          <div className="mega-nav-section">
            <h3>Media</h3>
            <ul>
              <MainNavItem name="Articles" />
              <MainNavItem name="Mixes" />
              <MainNavItem name="Tracks" />
              <MainNavItem name="Videos" />
            </ul>
          </div>

          <div className="mega-nav-section">
            <h3>Info</h3>
            <ul>
              <MainNavItem name="About" />
              <MainNavItem name="Press" />
              <MainNavItem name="Code" />
              <MainNavItem name="Mailing List" />
            </ul>
          </div>

          <div className="mega-nav-section">
            <h3>Support</h3>
            <ul>
              <MainNavItem name="FAQ's" />
              <MainNavItem name="Tutorials" />
              <MainNavItem name="User Guides" />
              <MainNavItem name="Contact" />
            </ul>
          </div>

          <div className="mega-nav-section">
            <h3>Etc.</h3>
            <ul>
              <MainNavItem name="Cookie Settings" to="set-cookie-preferences" />
              <ElectronOnly>
                <MainNavItem name="Admin" to="admin/list" />
              </ElectronOnly>
            </ul>
          </div>
        </div>
        <div className="mega-nav-mailing-list">
          <h3>Mailing List</h3>
          <CampaignMonitorForm
            id={CAMPAIGN_MONITOR_FORM_ID}
            onFormSubmitted={() => {
              ReactGA.event({
                category: 'User',
                action: 'Joined the mailing list from the mega nav.',
              })
            }}
            submitButtonText="Join"
          />
        </div>
        <footer className="mega-nav-footer">
          <a href="">Privacy Policy</a> | <a href="">Cookie Policy</a> | <a href="">Impressum</a><br />
          &copy; 2020, Hot Extramusicality, Inc. | Reichenberger Straße 176, 10999 Berlin, Deutschland | info@hem.rocks
        </footer>
      </HamburgerMenu>
    </nav>
  )
}

export default MegaNav
