import React, { ReactElement } from 'react'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../../lib/modules/popups'
import { IContentItem, DetailPopUp } from '../../content'
import { CartPopup, ThankYouPopup } from '../../cart'
import { SoundLibraryRefreshPopup } from '../../../components/popups'

interface IProps {
  currentContentItem: IContentItem
}

function Popups({ currentContentItem }: IProps): ReactElement {
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
