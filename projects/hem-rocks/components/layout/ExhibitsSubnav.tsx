import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { MainContentBanner } from '../../components/layout'

function ExhibitsSubnav(): ReactElement {
  return (
    <>
      <MainContentBanner>Exhibits</MainContentBanner>
      <nav className="main-content-subnav">
        <ul>
        </ul>
      </nav>
    </>
  )
}

export default ExhibitsSubnav
