import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function AboutSubnav(): ReactElement {
  return (
    <nav className="main-content-subnav">
      <ul>
        <li>
          <NavLink to="/about">About HEM</NavLink>
        </li>
        <li>
          <NavLink to="/mailing-list">Mailing List</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/support">Support</NavLink>
        </li>
        <li>
          <NavLink to="/press">Press Clippings</NavLink>
        </li>
        <li>
          <NavLink to="/press-kits">Press Kits</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AboutSubnav