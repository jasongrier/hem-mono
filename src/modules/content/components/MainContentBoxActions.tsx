import React, { ReactElement, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  linkTo: string

  buttonText?: string
}

function MainContentBoxActions({ buttonText, children, linkTo }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="main-content-box-actions">
      <div className="main-content-box-custom-actions">
        { children }
      </div>
      { buttonText && (
        <Link
          className="action-button"
          to={linkTo}
        >
          { buttonText }
        </Link>
      )}
    </div>
  )
}

export default MainContentBoxActions
