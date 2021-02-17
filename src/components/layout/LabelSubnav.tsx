import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function LabelSubnav(): ReactElement {
  return (
    <nav className="main-content-subnav">
      <ul>
        <li>
          <NavLink to="/label">About HEM</NavLink>
        </li>
        <li>
          <NavLink to="/press/filter/label">Press Clippings</NavLink>
        </li>
        <li>
          <NavLink to="/press-kits/filter/label">Press Kits</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default LabelSubnav
