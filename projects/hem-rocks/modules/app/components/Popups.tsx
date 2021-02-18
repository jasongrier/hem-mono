import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../../lib/modules/popups'
import { IContentItem, DetailPopUp } from '../../content'
import { CartPopup, ThankYouPopup } from '../../cart'
import { SoundLibraryRefreshPopup } from '../../../components/popups'
import { RootState } from '../../../index'

function Popups(): ReactElement {
  const { currentContentItem } = useSelector((state: RootState) => ({
    currentContentItem: state.content.currentContentItem,
  }))

  const { pathname } = useLocation()

  return (
    <div className="popups">
      <PopupContainer
        closeIcon={CloseButton}
        id="detail-popup"
      >
        <DetailPopUp
          contentItem={currentContentItem}
          filter={pathname.split('/')[3]}
          category={pathname.split('/')[1]}
          showMegaBlurb={!pathname.includes('press-releases')}
        />
      </PopupContainer>

      <PopupContainer
        closeIcon={CloseButton}
        id="cart-popup"
      >
        {(props: any) => (
          <CartPopup redirecting={props?.redirecting} />
        )}
      </PopupContainer>


      <PopupContainer
        closeIcon={CloseButton}
        id="thank-you-popup"
      >
        <ThankYouPopup />
      </PopupContainer>

      <PopupContainer
        closeIcon={CloseButton}
        id="sound-library-refresh-popup"
      >
        {(props: any) => (
          <SoundLibraryRefreshPopup />
        )}
      </PopupContainer>
    </div>
  )
}

export default Popups
