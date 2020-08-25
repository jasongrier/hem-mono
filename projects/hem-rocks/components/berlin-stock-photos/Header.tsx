import React, { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ElectronOnly } from '../../../../lib/components'

function Header(): ReactElement {
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
      <nav>
        <ul>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <ElectronOnly>
            <li>
              <NavLink to="/admin/list">Admin</NavLink>
            </li>
          </ElectronOnly>
        </ul>
      </nav>
    </header>
  )
}

export default Header
