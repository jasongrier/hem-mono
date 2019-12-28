import React, { ReactElement, useCallback } from 'react'
import $ from 'jquery'
import { Planes } from '../../../packages/generative-art'

function GrandPianoHeroine(): ReactElement {
  const onCtaClicked = useCallback(
    function onCtaClicked() {
      $('html, body').animate({ scrollTop: 640 }, 250)
    }, [],
  )

  return (
    <div className="grand-piano-heroine">
      <div className="sound-library-home-hero-backdrop">
        <Planes />
      </div>
      <div className="sound-library-home-hero-content">
        <div className="sound-library-home-hero-blurb">
          <h1>
            Grand Piano
          </h1>
          <div>
            <h2>Eight new packs for Ableton Live</h2>
            <ul>
              <li>9-foot grand recorded with four mic placements</li>
              <li>Five full "prepared" pianos</li>
              <li>Hand percussion, bowing, and e-bow</li>
              <li>Palm, forearm, and woodblock clusters</li>
              <li><i><small><sup>*</sup>including the full 88-key cluster chord</small></i></li>
            </ul>
            <button
              className="standard-button"
              onClick={onCtaClicked}
            >
              Listen &amp; Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrandPianoHeroine
