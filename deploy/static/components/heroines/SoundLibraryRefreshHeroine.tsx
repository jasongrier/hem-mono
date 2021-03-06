import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { CloseButton } from '../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../lib/modules/popups'
import { assetHostHostname } from '../../functions'

function SoundLibraryRefreshHeroine(): ReactElement {
  const dispatch = useDispatch()

  const assetHost = assetHostHostname()

  return (
    <div className="sound-library-refresh-heroine">
      <a
        href="#"
        onClick={() => dispatch(openPopup('sound-library-refresh-popup'))}
      >
        <div
          className="sound-library-refresh-heroine-image"
          style={{
            backgroundImage: `url(${assetHost}/hem-rocks/site/heroines/sound-library-refresh-heroine-5.jpg)`,
          }}
        />
        <div className="sound-library-refresh-heroine-details">
          <div className="sound-library-refresh-heroine-text">
            <h2>SL 2021</h2>
            <h5>HEM's Sound Library re-thought as a selection of highly playable virtual instruments.</h5>
          </div>
        </div>
      </a>
    </div>
  )
}

export default SoundLibraryRefreshHeroine
