import React, { useEffect, ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { map } from 'lodash'
import { CloseButton } from '../../../../../../lib/packages/hem-buttons'
import { PopupContainer, closePopup, openPopup } from '../../../../../../lib/modules/popups'
import { usePrevious } from '../../../../../../lib/hooks'
import { DetailPopUp, hasCategory, setCurrentItem } from '../../content'
import { CartPopup, ThankYouPopup } from '../../cart'
import { RootState } from '../../../../index'

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
  const previouslyOpenPopup = usePrevious(currentlyOpenPopUp)

  useEffect(function handleOpenRoutedPopup() {
    const [basePath, detail, slug] = pathname.replace(/^\//, '').split('/')

    if (detail !== 'detail') return

    dispatch(closePopup())

    const requestedContentItem = contentItems.find(item =>
      item.slug === slug && !hasCategory(item, 'site-texts')
    )

    if (requestedContentItem) {
      dispatch(setCurrentItem(requestedContentItem))
      dispatch(openPopup('detail-popup'))
    }
  }, [contentItems, pathname])

  useEffect(function handleCloseRoutedPopup() {
    if (!currentlyOpenPopUp && previouslyOpenPopup) {
      const [basePath, detail, slug, filter] = pathname.replace(/^\//, '').split('/')

      let path = '/'

      if (detail === 'detail') {
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
