import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function SoundLibrarySubnav(): ReactElement {
  return (
    <nav className="main-content-subnav">
      <ul>
        <li>
          <NavLink to="/tracks">Tracks</NavLink>
        </li>
        <li>
          <NavLink to="/playlists-and-albums">Playlists &amp; Albums</NavLink>
        </li>
        <li>
          <NavLink to="/artists">Artists</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SoundLibrarySubnav
