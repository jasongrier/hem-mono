import React, { useEffect, ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { CloseButton } from '../../../../../../lib/packages/hem-buttons'
import { PopupContainer, closePopup, openPopup } from '../../../../../../lib/modules/popups'
import { usePrevious } from '../../../../../../lib/hooks'
import { DetailPopup, hasCategory, setCurrentItem, ExhibitPopup } from '../../content'
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
    const [basePath, viewType, slug] = pathname.replace(/^\//, '').split('/')

    if (viewType !== 'detail') return

    dispatch(closePopup())

    const requestedContentItem = contentItems.find(item =>
      item.slug === slug && !hasCategory(item, 'site-texts')
    )

    if (requestedContentItem) {
      dispatch(setCurrentItem(requestedContentItem))
      dispatch(openPopup(
        basePath === 'exhibits'
          ? 'exhibit-popup'
          : 'detail-popup'
      ))
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
        <DetailPopup
          contentItem={currentContentItem}
          filter={pathname.split('/')[4]}
          category={pathname.split('/')[1]}
        />
      </PopupContainer>

      <PopupContainer
        closeIcon={CloseButton}
        id="exhibit-popup"
      >
        <ExhibitPopup rootContentItem={currentContentItem} />
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
        id="program-popup"
      >
        <div className="program-popup">
          <h2>Program 2021</h2>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div className="program-popup-row">
              <h3>April</h3>
              <p>
                <strong>Tracks: </strong>Line Gøttsche, Julia Holter &amp; Michael Pisaro, Lucrecia Dalt, Jeepneys, Sara Galaxia<br />
                <strong>Articles: </strong>Vito Acconci, India Cooke<br />
                <strong>Editions: </strong>Julia Holter, SL1 NFT's<br />
                <strong>Exhibits: </strong>The Catalogue as a Work of Art<br />
                <strong>Sound Library: </strong>Updates: Destroyed Piano, Studio #Fails, Noise Reduction Artefacts, and more<br />
              </p>
            </div>
            <div className="program-popup-row">
              <h3>May</h3>
              <p>
                <strong>Tracks: </strong>Jason Urick, Hanne Lippard, Kevin Drumm, UCC Harlo<br />
                <strong>Articles: </strong>Gary Schultz, Anna Luisa Petrisko, Annie Gårlid<br />
                <strong>Mixes: </strong>Julia Holter, Line Gøttsche<br />
                <strong>Exhibits: </strong>Album-oriented Sound Art<br />
                <strong>Sound Library: </strong>Viola, E-bow Piano, Grand Piano<br />
              </p>
            </div>
          </Scrollbars>
        </div>
      </PopupContainer>
    </div>
  )
}

export default Popups
