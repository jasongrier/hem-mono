import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { find } from 'lodash'
import { MuteButton } from '../../../../lib/modules/player'
import { RootState } from '../../index'
import { contentItemToTrack } from '../../modules/content'

function GrandPianoHeroine(): ReactElement {
  const { allProducts, currentContentItem } = useSelector((state: RootState) => ({
    allProducts: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
  }))

  const grandPianoProduct = find(allProducts, { slug: 'grand-piano' })
  const grandPianoTrackItem = find(allProducts, { slug: grandPianoProduct.trackSlug })
  const productUrl = '/sound-library/grand-piano'

  if (!grandPianoProduct) return (<div />)

  return (
    <div className="grand-piano-heroine">
      <div className="grand-piano-heroine-image" />
      <Link to={productUrl}>
        <div className="grand-piano-heroine-details">
          <div>
            <MuteButton
              canStartPlayback={true}
              track={contentItemToTrack(grandPianoTrackItem, productUrl)}
            />
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
