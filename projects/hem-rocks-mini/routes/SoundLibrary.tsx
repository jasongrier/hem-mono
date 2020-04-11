import React, { ReactElement, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import { MainContentList } from '../components'
import { setCurrentProduct } from '../modules/products'
import { PopupContainer, openPopup } from '../../../lib/modules/popups'
import { TrackPlayPauseButton } from '../../../lib/modules/player'
import { CloseButton } from '../../../lib/packages/hem-buttons'
import { RootState } from '../index'

function SoundLibrary(): ReactElement {
  const { allProducts } = useSelector((state: RootState) => ({
    allProducts: state.products.products,
  }))

  const dispatch = useDispatch()

  const packs = allProducts.filter(product => product.tags.includes('sound-library'))

  function launchBuyPopup(pack) {
    dispatch(setCurrentProduct(pack))
    dispatch(openPopup('buy-popup'))
  }

  return (
    <div className="page page-sound-library">
      <MainContentList
        buttonText="Download"
        stateSlice="products"
        stateField="products"
        tag="sound-library"
        title="Sound Library"
      >
        {(pack) => {
          <TrackPlayPauseButton track={{
            id: pack.slug,
            type: 'soundcloud',
            resource: pack.soundCloudTrackId,
          }}/>
        }}
      </MainContentList>
    </div>
  )
}

export default SoundLibrary
