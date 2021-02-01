import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function SoundLibrarySubnav(): ReactElement {
  return (
    <nav className="main-content-subnav">
      <ul>
        <li>
          <NavLink
            isActive={(_, { pathname }) =>
              pathname.indexOf('/sound-library') === 0
              && !pathname.includes('about-sl')
              && !pathname.includes('made-with-sl')
              && !pathname.includes('whats-new-in-sl2')
            }
            to="/sound-library"
          >
            Packs
          </NavLink>
        </li>
        <li>
          <NavLink to="/sound-library/about-sl">About SL</NavLink>
        </li>
        <li>
          <NavLink to="/sound-library/whats-new-in-sl2">What's new in SL2</NavLink>
        </li>
        <li>
          <NavLink to="/sound-library/made-with-sl">Made something with SL?</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SoundLibrarySubnav
