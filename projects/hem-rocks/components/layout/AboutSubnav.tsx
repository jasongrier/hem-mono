import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { MainContentBanner } from '../../components/layout'

function AboutSubnav(): ReactElement {
  return (
    <>
      <MainContentBanner
        headline="General Info"
      />
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
            <NavLink to="/press-releases">Press Releases</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default AboutSubnav
