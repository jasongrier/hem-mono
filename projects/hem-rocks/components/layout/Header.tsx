import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu'

interface IProps {
  subheading?: string
  subheadingLink?: string
}

function Header({ subheading, subheadingLink }: IProps): ReactElement {
  return (
    <>
      <header className="site-header">
        <h1>
          <span>
            <Link to="/">HEM </Link>
          </span>
        </h1>
        { subheading &&
          <h2>
            <span>
              <Link to={subheadingLink}>{ subheading }</Link>
            </span>
          </h2>
        }
      </header>

      <MegaMenu />
    </>
  )
}

export default Header
