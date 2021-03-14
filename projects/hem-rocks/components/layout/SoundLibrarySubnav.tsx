import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { MainContentBanner } from '../../components/layout'

function SoundLibrarySubnav(): ReactElement {
  return (
    <>
      <MainContentBanner
        headline="SL2"
        // subHeadline="HEM Sound Library is a critical resource for experimental sound practices"
      />
      <nav className="main-content-subnav">
        <ul>
          <li>
            <NavLink
              isActive={(_, { pathname }) =>
                pathname.indexOf('/sound-library') === 0
                && !pathname.includes('about-sl')
                && !pathname.includes('made-with-sl')
                && !pathname.includes('whats-new-in-sl-two')
              }
              to="/sound-library"
            >
              Packs
            </NavLink>
          </li>
          <li>
            <NavLink to="/sound-library/about-sl">About SL2</NavLink>
          </li>
          <li>
            <NavLink to="/sound-library/made-with-sl">Made something with it?</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default SoundLibrarySubnav
