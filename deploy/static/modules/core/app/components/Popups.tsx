import React, { useEffect, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { map } from 'lodash'
import { CloseButton } from '../../../../../../lib/packages/hem-buttons'
import { PopupContainer, closePopup, openPopup } from '../../../../../../lib/modules/popups'
import { usePrevious } from '../../../../../../lib/hooks'
import { DetailPopUp, hasCategory, setCurrentItem } from '../../content'
import { CartPopup, ThankYouPopup } from '../../cart'
import { RootState } from '../../../../index'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

function Popups(): ReactElement {
  const { contentItems, currentContentItem, currentlyOpenPopUp, currentProject } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  const { pathname } = useLocation()
  const history = useHistory()

  useEffect(function handleRoutedPopups() {
    const [basePath, detail, slug] = pathname.replace(/^\//, '').split('/')
    const requestedContentItem = contentItems.find(item =>
      item.slug === slug && !hasCategory(item, 'site-texts')
    )

    let popupId

    if (
      pathname.includes('/cart/')
      || /cart$/.test(pathname)
    ) {
      popupId = 'cart-popup'
    }

    else if (basePath === 'thank-you') {
      popupId = 'thank-you-popup'
    }

    else if (detail === 'detail') {
      popupId = 'detail-popup'
    }

    if (
      popupId === currentlyOpenPopUp
      && popupId !== 'detail-popup'
    ) return

    dispatch(closePopup())

    if (popupId) {
      if (requestedContentItem) {
        dispatch(setCurrentItem(requestedContentItem))
      }

      dispatch(openPopup(popupId))
    }
  }, [contentItems, pathname])

  const previouslyOpenPopup = usePrevious(currentlyOpenPopUp)

  useEffect(function onClosePopup() {
    if (!currentlyOpenPopUp && previouslyOpenPopup) {
      const [basePath, detail, slug, filter] = pathname.replace(/^\//, '').split('/')

      let path = '/'

      if (
        pathname === '/support'
        && previouslyOpenPopup === 'thank-you-popup'
      ) {
        path += 'support'
      }

      const staticPageCartReturnPaths = [
        'sound-library/made-with-sl',
        'sound-library/about-sl',
        'about',
        'contact',
        'mailing-list',
        'support',
      ]

      let cartReturnFound = false

      for (const staticPageCartReturnPath of staticPageCartReturnPaths) {
        if (
          pathname.includes(staticPageCartReturnPath)
          && pathname.includes('cart')
        ) {
          path = '/' + staticPageCartReturnPath
          cartReturnFound = true
          break
        }
      }

      if (
        !cartReturnFound
        && detail === 'detail'
      ) {
        path += basePath

        if (filter) {
          path += '/filter/' + filter
        }
      }

      if (path === '/home') {
        path = '/'
      }

      history.push(path)
    }
  }, [currentlyOpenPopUp, previouslyOpenPopup])

  return (
    <div className="popups">
      <PopupContainer
        closeIcon={CloseButton}
        id="detail-popup"
      >
        <DetailPopUp
          contentItem={currentContentItem}
          filter={pathname.split('/')[4]}
          category={pathname.split('/')[1]}
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
    </div>
  )
}

export default Popups
