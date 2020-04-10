import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { find } from 'lodash'
import { activateApp } from '../../modules/app/actions'
import { MuteButton } from '../../../../lib/modules/player'
import { LaunchBuyPopupButton } from '../index'
import { RootState } from '../../index'

function GrandPianoHeroineAlternate(): ReactElement {
  const { allProducts } = useSelector((state: RootState) => ({
    allProducts: state.products.products,
  }))

  const dispatch = useDispatch()

  const grandPianoProduct = find(allProducts, { slug: 'grand-piano' })

  if (!grandPianoProduct) return (<div />)

  return (
    <div className="grand-piano-heroine">
      <div className="grand-piano-heroine-image" />
      <div className="grand-piano-heroine-details">
        <div
          className="grand-piano-heroine-speaker-button"
          onClick={() => {
            dispatch(activateApp())
          }}
        >
          <MuteButton />
        </div>
        <div className="grand-piano-heroine-text">
          <h2>New in Sound Library: Grand Piano</h2>
          <p>
            &bull; 6 Treatments: Vanilla, Rice Paper, Black Cinefoil, Steel Tinplate, Louis V Chain, Guitar Pick
          </p>
          <p>
            &bull; 1400 One-shots: Bowing, Scraping, Hand Percussion, Cluster Chords, etc.
          </p>
          <LaunchBuyPopupButton product={grandPianoProduct} />
        </div>
      </div>
    </div>
  )
}

export default GrandPianoHeroineAlternate
