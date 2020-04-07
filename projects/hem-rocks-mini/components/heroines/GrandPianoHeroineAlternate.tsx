import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseButton, SpeakerButton } from '../../../../lib/components/buttons'
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
      </div>
    </div>
  )
}

export default GrandPianoHeroineAlternate
