import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import { MuteButton } from '../../../../lib/modules/player'
import { LaunchDetailPopupButton } from '../../modules/content'
import { RootState } from '../../index'

function GrandPianoHeroine(): ReactElement {
  const { allProducts } = useSelector((state: RootState) => ({
    allProducts: state.content.contentItems,
  }))

  const grandPianoProduct = find(allProducts, { slug: 'grand-piano' })

  if (!grandPianoProduct) return (<div />)

  return (
    <div className="grand-piano-heroine">
      <div className="grand-piano-heroine-image" />
      <div className="grand-piano-heroine-details">
        <div>
          <MuteButton
            canStartPlayback={true}
            track={{
              id: grandPianoProduct.slug,
              type: 'soundcloud',
              resource: grandPianoProduct.soundCloudTrackId,
            }}
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
          <LaunchDetailPopupButton contentItem={grandPianoProduct}>
            Download
          </LaunchDetailPopupButton>
        </div>
      </div>
    </div>
  )
}

export default GrandPianoHeroine
