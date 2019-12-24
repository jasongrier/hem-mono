import { noop } from 'lodash'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu'

interface IProps {
  linkBack?: boolean
  onLogoClicked?: () => void
}

function Header({ linkBack = true, onLogoClicked = noop }: IProps): ReactElement {
  return (
    <>
      <header className="site-header">
        <h1>
          <span>
            <Link
              onClick={onLogoClicked}
              to="/"
            >
              HEM
            </Link>
          </span>
        </h1>
      </header>

      <MegaMenu />
    </>
  )
}

export default Header
