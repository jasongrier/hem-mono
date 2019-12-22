import { noop } from 'lodash'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  onLogoClicked?: () => void
}

function InternalHeader({ onLogoClicked = noop }: IProps): ReactElement {
  return (
    <header>
      <h1>
        <span>
          <Link
            onClick={onLogoClicked}
            to="/internal"
          >
            HEM Internal Pages
          </Link>
        </span>
      </h1>
      <nav>
        <ul>
          <li>Jira</li>
          <li>Github</li>
          <li>NPM</li>
        </ul>
      </nav>
    </header>
  )
}

export default InternalHeader
