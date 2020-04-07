import React, { ReactElement } from 'react'
import { MuteButton } from '../../../../lib/modules/player'

function GrandPianoHeroine(): ReactElement {
  return (
    <div className="alternate grand-piano-heroine">
      <div
        className="grand-piano-heroine-banner-image"
        style={{
          backgroundImage: "url(http://static.hem.rocks/hem-rocks/site/heroines/ex-piano.jpg)",
        }}
      />
      <div className="grand-piano-heroine-banner-description">
        <div className="grand-piano-heroine-banner-description-inner">
          <h2>Grand Piano</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum ac eros eu pellentesque. Cras orci arcu, sollicitudin vitae velit nec, varius facilisis neque. Sed varius consectetur finibus.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum ac eros eu pellentesque. Cras orci arcu, sollicitudin vitae velit nec, varius facilisis neque. Sed varius consectetur finibus.</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            <li>Feature 4</li>
          </ul>
          <div className="grand-piano-heroine-buttons">
            <button className="grand-piano-heroine-download-button">Download</button>
            <button className="grand-piano-heroine-mute-play-button">
              <i className="fas fa-volume-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrandPianoHeroine
