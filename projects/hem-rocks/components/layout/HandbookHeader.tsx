import { noop } from 'lodash'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  linkBack?: boolean
  onLogoClicked?: () => void
}

function HandbookHeader({ linkBack = true, onLogoClicked = noop }: IProps): ReactElement {
  return (
    <header className="internal-header">
      <h1>
        <span>
          { linkBack &&
            <Link
              onClick={onLogoClicked}
              to="/handbook"
            >
              &larr; HEM Handbook
            </Link>
          }
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

export default HandbookHeader
