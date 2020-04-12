import React, { ReactElement, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import { MainContentList } from '../components'
import { setCurrentContentItem } from '../modules/content'
import { PopupContainer, openPopup } from '../../../lib/modules/popups'
import { TrackPlayPauseButton } from '../../../lib/modules/player'
import { CloseButton } from '../../../lib/packages/hem-buttons'
import { RootState } from '../index'

function SoundLibrary(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const packs = allContentItems.filter(product => product.tags.includes('sound-library'))

  function launchBuyPopup(pack) {
    dispatch(setCurrentContentItem(pack))
    dispatch(openPopup('detail-popup'))
  }

  return (
    <div className="page page-sound-library">
      <MainContentList
        buttonText="Download"
        tag="sound-library"
        title="Sound Library"
      >
        {(pack) => (
          <TrackPlayPauseButton track={{
            id: pack.slug,
            type: 'soundcloud',
            resource: pack.soundCloudTrackId,
          }}/>
        )}
      </MainContentList>
    </div>
  )
}

export default SoundLibrary
