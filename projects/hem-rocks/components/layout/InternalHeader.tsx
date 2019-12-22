import { noop } from 'lodash'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  onLogoClicked?: () => void
}

function InternalHeader({ onLogoClicked = noop }: IProps): ReactElement {
  return (
    <header className="internal-header">
      <h1>
        <span>
          <Link
            onClick={onLogoClicked}
            to="/internal"
          >
            &larr; HEM Internal Pages
          </Link>
        </span>
      </h1>
      <nav>
        <ul>
          <li><a href="#">Jira</a></li>
          <li><a href="#">Github</a></li>
          <li><a href="#">NPM</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default InternalHeader
