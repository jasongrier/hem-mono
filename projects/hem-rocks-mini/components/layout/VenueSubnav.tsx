import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function VenueSubnav(): ReactElement {
  return (
    <nav className="main-content-subnav venue-subnav">
      <ul>
        <li>
          <NavLink exact to="/venue-calendar">Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/venue/main-stage">Main Stage</NavLink>
        </li>
        <li>
          <NavLink to="/venue/merch-table">Merch Table</NavLink>
        </li>
        <li>
          <NavLink to="/venue/archive">Archive</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default VenueSubnav
