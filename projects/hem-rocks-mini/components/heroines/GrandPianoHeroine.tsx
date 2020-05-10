import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { find } from 'lodash'
import { MuteButton } from '../../../../lib/modules/player'
import { RootState } from '../../index'

function GrandPianoHeroine(): ReactElement {
  const { allProducts, currentContentItem } = useSelector((state: RootState) => ({
    allProducts: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
  }))

  const grandPianoProduct = find(allProducts, { slug: 'grand-piano' })

  if (!grandPianoProduct) return (<div />)

  return (
    <div className="grand-piano-heroine">
      <div className="grand-piano-heroine-image" />
      <div className="grand-piano-heroine-details">
        <div>
          { grandPianoProduct.soundCloudTrackId && (
            <MuteButton
              canStartPlayback={true}
              track={{
                attribution: grandPianoProduct.trackAttribution,
                id: grandPianoProduct.slug,
                type: 'soundcloud',
                resource: grandPianoProduct.soundCloudTrackId,
              }}
            />
          )}
        </div>
        <div className="grand-piano-heroine-text">
          <h2>New in Sound Library: <strong>Grand Piano</strong></h2>
          <h5>
            A gritty and elegant prepared piano, recorded in Berlin
          </h5>
          <p>
            &bull; 6 Treatments: Vanilla, Rice Paper, Black Cinefoil, Steel Tinplate, Louis V Chain, Guitar Pick
          </p>
          <p>
            &bull; 1400 One-shots: Bowing, Scraping, Hand Percussion, Cluster Chords, etc.
          </p>
          <Link
            className="action-button"
            to="/sound-library/grand-piano"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GrandPianoHeroine
