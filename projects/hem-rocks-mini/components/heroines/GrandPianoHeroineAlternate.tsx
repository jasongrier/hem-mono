import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SpeakerButton } from '../../../../lib/components/buttons'
import { activateApp } from '../../modules/app'

function GrandPianoHeroineAlternate(): ReactElement {
  const dispatch = useDispatch()

  return (
    <div className="alternate grand-piano-heroine">
      <div
        className="grand-piano-heroine-image"
        style={{
          backgroundImage: "url(http://static.hem.rocks/hem-rocks/site/heroines/ex-piano.jpg)",
        }}
      />
      <div className="grand-piano-heroine-details">
        <div
          className="grand-piano-heroine-speaker-button"
          onClick={() => {
            dispatch(activateApp())
          }}
        >
          <SpeakerButton
            muted={false}
            setMuted={() => {}}
          />
        </div>
        <div className="grand-piano-heroine-text">
          <h2>New in Sound Library: Grand Piano</h2>
          <p>
            &bull; 6 Treatments: Vanilla, Rice Paper, Black Cinefoil, Steel Tinplate, Louis V Chain, Guitar Pick
          </p>
          <p>
            &bull; 1400 One-shots: Bowing, Scraping, Hand Percussion, Cluster Chords, etc.
          </p>
          <button>&raquo;Download&laquo;</button>
        </div>
      </div>
    </div>
  )
}

export default GrandPianoHeroineAlternate
