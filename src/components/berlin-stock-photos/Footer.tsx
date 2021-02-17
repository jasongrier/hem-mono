import React, { ReactElement } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ElectronOnly } from '../../../../lib/components'

function Footer(): ReactElement {
  return (
    <footer>
      <nav>
      <ul>
        <li>
          <NavLink to="https://www.instagram.com/berlinstockphotos/">Instagram</NavLink>
        </li>
        <li>
          <NavLink to="https://web.facebook.com/berlinstockphotos/">Facebook</NavLink>
        </li>
        <li>
          <NavLink to="mailto:info@berlinstockphotos.com">info@berlinstockphotos.com</NavLink>
        </li>
        <li>
          <NavLink to="/stock-photos-license">License Agreement</NavLink>
        </li>
      </ul>
      </nav>
      <p>
        &copy; 2020—2021 Berlin Stock Photos
      </p>
    </footer>
  )
}

export default Footer
