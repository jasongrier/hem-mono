import React, { ReactElement } from 'react'
import { ElectronOnly, HamburgerMenu } from '../../../../lib/components'
import { Logo, MainNavItem } from './index'

function MegaNav(): ReactElement {
  return (
    <nav className="mega-nav">
      <HamburgerMenu openByDefault={true}>
        <Logo />
        <div className="mega-nav-sections clearfix">
          {/* Products */}
          <div className="mega-nav-section">
            <h3>Products</h3>
            <ul>
              <MainNavItem name="Apps" />
              <MainNavItem name="Sound Library" />
              <MainNavItem name="Label" />
              <MainNavItem name="Merch" />
            </ul>
          </div>

          {/* Venue */}
          <div className="mega-nav-section">
            <h3>Venue</h3>
            <ul>
              <MainNavItem name="Calendar" />
              <MainNavItem name="Archive" />
            </ul>
          </div>

          {/* Media */}
          <div className="mega-nav-section">
            <h3>Media</h3>
            <ul>
              <MainNavItem name="Mixes" />
              <MainNavItem name="Tracks" />
              <MainNavItem name="Videos" />
            </ul>
          </div>

          {/* Info */}
          <div className="mega-nav-section">
            <h3>Info</h3>
            <ul>
              <MainNavItem name="Info" />
              <MainNavItem name="Press" />
              <MainNavItem name="Blog" />
              <MainNavItem name="Code" />
              <MainNavItem name="Mailing List" />
            </ul>
          </div>

          {/* Support */}
          <div className="mega-nav-section">
            <h3>Support</h3>
            <ul>
              <MainNavItem name="Support" />
              <MainNavItem name="FAQ's" />
              <MainNavItem name="Tutorials" />
              <MainNavItem name="User Guides" />
              <MainNavItem name="Contact" />
            </ul>
          </div>

          {/* Admin */}
          <div className="mega-nav-section">
            <h3>Etc.</h3>
            <ul>
              <MainNavItem name="Privacy Policy" />
              <MainNavItem name="Cookie Policy" />
              <MainNavItem name="Impressum" />
              <MainNavItem name="Cookie preferences" to="set-cookie-preferences" />
              <ElectronOnly>
                <MainNavItem name="Admin" to="admin/list" />
              </ElectronOnly>
            </ul>
          </div>
        </div>
      </HamburgerMenu>
    </nav>
  )
}

export default MegaNav
