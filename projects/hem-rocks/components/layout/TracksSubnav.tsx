import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function SoundLibrarySubnav(): ReactElement {
  return (
    <nav className="main-content-subnav">
      <ul>
        <li>
          <NavLink to="/tracks-overview">March 2021</NavLink>
        </li>
        <li>
          <NavLink to="/tracks">All</NavLink>
        </li>
        <li>
          <NavLink to="/playlists">Playlists</NavLink>
        </li>
        <li>
          <NavLink to="/artists">Artists</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SoundLibrarySubnav
