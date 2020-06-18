import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function NewWebsiteHeroine(): ReactElement {
  return (
    <div className="new-website-heroine">
      <Link to="articles/new-website">
        <div className="new-website-heroine-image" />
        <div className="new-website-heroine-details">
          <div className="new-website-heroine-text">
            <h2>New website!</h2>
            <h5>
              Find out what's here now, and what's coming soon
            </h5>
            <button className="action-button">
              Learn more
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NewWebsiteHeroine
