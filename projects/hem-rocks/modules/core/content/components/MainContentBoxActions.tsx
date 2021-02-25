import React, { ReactElement, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  buttonText?: string
}

function MainContentBoxActions({ buttonText, children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="main-content-box-actions">
      <div className="main-content-box-custom-actions">
        { children }
      </div>
      { buttonText && (
        <button className="action-button">
          { buttonText }
        </button>
      )}
    </div>
  )
}

export default MainContentBoxActions
