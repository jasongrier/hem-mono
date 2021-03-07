import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { MainContentBanner } from '../../components/layout'

function EditionsSubnav(): ReactElement {
  return (
    <>
      <MainContentBanner>Editions</MainContentBanner>
      <nav className="main-content-subnav">
        <ul>
          <li>
            <NavLink to="/editions">Digital</NavLink>
          </li>
          <li>
            <NavLink to="/editions-physical">Physical</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default EditionsSubnav
