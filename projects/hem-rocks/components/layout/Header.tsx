import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu'

function Header(): ReactElement {
  return (
    <>
      <header className="site-header">
        <h1>
          <span>
            <Link to="/">HEM</Link>
          </span>
        </h1>
      </header>

      <MegaMenu />
    </>
  )
}

export default Header
