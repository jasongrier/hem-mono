import React, { ReactElement } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ElectronOnly } from '../../../../lib/components'

function Footer(): ReactElement {
  return (
    <footer>
      <nav>
      <ul>
        <li>
          <NavLink to="">Instagram</NavLink>
        </li>
        <li>
          <NavLink to="">Facebook</NavLink>
        </li>
        <li>
          <NavLink to="">Twitter</NavLink>
        </li>
      </ul>
      </nav>
      <p>
        &copy; 2020—2021 Berlin Stock Photos, OÜ
      </p>
    </footer>
  )
}

export default Footer
