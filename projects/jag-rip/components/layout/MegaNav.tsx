import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CampaignMonitorForm, ElectronOnly, HamburgerMenu } from '../../../../lib/components'
import { setMegaNavOpen } from '../../modules/app'
import { Logo, MainNavItem, SiteFooter } from './index'
import ReactGA from 'react-ga'
import { CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, CAMPAIGN_MONITOR_FORM_ID, BERLIN_STOCK_PHOTOS } from '../../config'
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
              <MainNavItem name="Calendar" to="venue" />
              <MainNavItem name="Main Stage" to="venue-main-stage" />
              <MainNavItem name="Archive" to="venue-archive" />
              <MainNavItem name="Merch Table" to="venue-merch" />
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
              <MainNavItem name="FAQ's" to="faqs" />
              <MainNavItem name="Tutorials" />
              <MainNavItem name="User Guides" />
              <MainNavItem name="Contact" />
            </ul>
          </div>

          <div className="mega-nav-section">
            <h3>Etc.</h3>
            <ul>
              <MainNavItem name="Cookie Settings" />
              <MainNavItem name="Press Kits" />
              <ElectronOnly>
                <MainNavItem name="Admin" to="admin/list" />
              </ElectronOnly>
            </ul>
          </div>
        </div>
        <div className="mega-nav-mailing-list">
          <h3>Mailing List</h3>
          <CampaignMonitorForm
            action={CAMPAIGN_MONITOR_FORM_ACTION}
            emailFieldName={CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME}
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
          <SiteFooter />
        </footer>
      </HamburgerMenu>
    </nav>
  )
}

export default MegaNav
