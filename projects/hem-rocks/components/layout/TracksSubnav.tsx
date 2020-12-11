import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function SoundLibrarySubnav(): ReactElement {
  return (
    <nav className="main-content-subnav">
      <ul>
        <li>
          <NavLink
            isActive={(_, { pathname }) =>
              pathname.indexOf('/tracks') === 0
              && !pathname.includes('tracks-by-artist')
            }
            to="/tracks"
          >
            Tracks Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracks/tracks-by-artist">Tracks by Artist</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SoundLibrarySubnav
