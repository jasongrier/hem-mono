import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { assetHostHostname } from '../../functions'

function SoundLibraryRefreshHeroine(): ReactElement {
  const assetHost = assetHostHostname()

  return (
    <div className="sound-library-refresh-heroine">
      <Link to="/sound-library">
        <div
          className="sound-library-refresh-heroine-image"
          style={{
            backgroundImage: `url(${assetHost}/hem-rocks/site/heroines/sound-library-refresh-heroine-5.jpg)`,
          }}
        />
        <div className="sound-library-refresh-heroine-details">
          <div className="sound-library-refresh-heroine-text">
            <h2>SL 2020</h2>
            <h5>Sound Library re-thought as a selection of highly playable virtual instruments.</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SoundLibraryRefreshHeroine
