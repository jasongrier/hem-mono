import React, { ReactElement } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ElectronOnly, HamburgerMenu } from '../../../../lib/components'
import Nav from './Nav'
import { RootState } from '../../index'

function Header(): ReactElement {
  const { pathname } = useLocation()

  return (
    <header className="main-header">
      <h1>
        <Link to="/">
          Berlin Stock Photos
        </Link>
      </h1>
      <h2>
        Lushness. Weirdness. Greenery. Grit. Updated daily.
      </h2>
      <nav className="nav-desk">
        <Nav />
      </nav>
      <HamburgerMenu>
        <Nav isMobile />
      </HamburgerMenu>
    </header>
  )
}

export default Header
