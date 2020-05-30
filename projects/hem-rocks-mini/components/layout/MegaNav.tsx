import React, { ReactElement } from 'react'
import { ElectronOnly, HamburgerMenu } from '../../../../lib/components'
import { Logo, MainNavItem } from './index'

function MegaNav(): ReactElement {
  return (
    <nav className="mega-nav">
      <HamburgerMenu openByDefault={true}>
        <Logo />
        <div className="clearfix">
          {/* Products */}
          <ul className="mega-nav-section">
            <MainNavItem name="Apps" />
            <MainNavItem name="Sound Library" />
            <MainNavItem name="Label" />
            <MainNavItem name="Merch" />
          </ul>

          {/* Venue */}
          <ul className="mega-nav-section">
            <MainNavItem name="Calendar" />
            <MainNavItem name="Archive" />
          </ul>

          {/* Media */}
          <ul className="mega-nav-section">
            <MainNavItem name="Mixes" />
            <MainNavItem name="Tracks" />
            <MainNavItem name="Videos" />
          </ul>

          {/* Info */}
          <ul className="mega-nav-section">
            <MainNavItem name="Info" />
            <MainNavItem name="Press" />
            <MainNavItem name="Blog" />
            <MainNavItem name="Code" />
            <MainNavItem name="Mailing List" />
          </ul>

          {/* Support */}
          <ul className="mega-nav-section">
            <MainNavItem name="Support Home" />
            <MainNavItem name="Tutorials" />
            <MainNavItem name="User Guides" />
          </ul>

          {/* Admin */}
          <ul className="mega-nav-section">
            <MainNavItem name="Privacy Policy" />
            <MainNavItem name="Cookie Policy" />
            <MainNavItem name="Impressum" />
            <MainNavItem name="Set cookie preferences" to="set-cookie-preferences" />
            <ElectronOnly>
              <MainNavItem name="Admin" to="admin/list" />
            </ElectronOnly>
          </ul>
        </div>
      </HamburgerMenu>
    </nav>
  )
}

export default MegaNav
