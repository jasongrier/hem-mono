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

  const routedPopups = PROJECT_CONFIGS[currentProject]
    .ROUTED_POPUPS
    .map((basePath: string) => ({
      basePath,
      id: 'detail-popup'
    }))

  useEffect(function handleRoutedPopups() {
    const [basePath, slug, cart, orCart] = pathname.replace(/^\//, '').split('/')
    const requestedContentItem = contentItems.find(item =>
      item.slug === slug && !hasCategory(item, 'site-texts')
    )

    let popupId

    if (
      basePath === 'cart'
      || slug === 'cart'
      || cart === 'cart'
      || orCart === 'cart'
    ) {
      popupId = 'cart-popup'
    }

    if (basePath === 'thank-you') {
      popupId = 'thank-you-popup'
    }

    if (!popupId) {
      for (const routedPopup of routedPopups) {
        if (
          basePath === routedPopup.basePath
          && requestedContentItem
        ) {
          popupId = routedPopup.id
          break
        }
      }
    }

    if (
      popupId === currentlyOpenPopUp
      && popupId !== 'detail-popup'
    ) return

    if (popupId) {
      dispatch(closePopup())

      if (requestedContentItem) {
        dispatch(setCurrentItem(requestedContentItem))
      }

      dispatch(openPopup(popupId))
    }

    else {
      dispatch(closePopup())
    }
  }, [contentItems, pathname])

  const previouslyOpenPopup = usePrevious(currentlyOpenPopUp)

  useEffect(function closePopup() {
    if (!currentlyOpenPopUp && previouslyOpenPopup) {
      const pathnameSplit = pathname.replace(/^\//, '').split('/')

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
        && map(routedPopups, 'basePath').includes(pathnameSplit[0])
      ) {
        path += pathnameSplit[0]

        if (pathnameSplit[2]) {
          path += '/filter/' + pathnameSplit[2]
        }
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
          filter={pathname.split('/')[3]}
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
