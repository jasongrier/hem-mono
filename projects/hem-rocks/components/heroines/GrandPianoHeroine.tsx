import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { find } from 'lodash'
import { MuteButton } from '../../../../lib/modules/player'
import { RootState } from '../../index'
import { contentItemToTrack, requestReadItems } from '../../modules/content'

function GrandPianoHeroine(): ReactElement {
  const { allProducts } = useSelector((state: RootState) => ({
    allProducts: state.content.contentItems,
  }))

  const grandPianoProduct = find(allProducts, { slug: 'grand-piano' })

  if (!grandPianoProduct) return (<div />)

  const grandPianoTrackItem = find(allProducts, { slug: 'grand-piano-sample-track-1' })
  const productUrl = '/sound-library/grand-piano'

  return (
    <div className="grand-piano-heroine">
      <Link to={productUrl}>
        <div className="grand-piano-heroine-image" />
        <div className="grand-piano-heroine-details">
          <div>
            { grandPianoTrackItem && (
              <MuteButton
                canStartPlayback={true}
                track={contentItemToTrack(grandPianoTrackItem)}
              />
            )}
          </div>
          <div className="grand-piano-heroine-text">
            <h2>New in Sound Library: <strong>Grand Piano</strong></h2>
            <h5>
              A gritty and elegant prepared piano, recorded in Berlin
            </h5>
            {/* <p>
              &bull; 6 Treatments: Vanilla, Rice Paper, Black Cinefoil, Steel Tinplate, Louis V Chain, Guitar Pick
            </p>
            <p>
              &bull; 1400 One-shots: Bowing, Scraping, Hand Percussion, Cluster Chords, etc.
            </p> */}
            <button className="action-button">
              Learn more
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GrandPianoHeroine