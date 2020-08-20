import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function NewWebsiteHeroine(): ReactElement {
  return (
    <div className="new-website-heroine">
      <Link to="/new-website">
        <div className="new-website-heroine-image" />
        <div className="new-website-heroine-details">
          <div className="new-website-heroine-text">
            <h2>SL 2020</h2>
            <h5>Sound Library re-thought as a selection of highly playable virtual instruments.</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NewWebsiteHeroine
