import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { MainContentBanner } from '../../components/layout'

function ExhibitsSubnav(): ReactElement {
  return (
    <>
      <MainContentBanner
        headline="Exhibits"
      />
      <nav className="main-content-subnav">
        <ul>
        </ul>
      </nav>
    </>
  )
}

export default ExhibitsSubnav
