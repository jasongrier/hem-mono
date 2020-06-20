import React, { ReactElement, SyntheticEvent, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { find, isFinite, isNaN } from 'lodash'
import uuid from 'uuid/v1'
import Scrollbars from 'react-scrollbars-custom'
import ReactGA from 'react-ga'
import { Spinner } from '../../../../../lib/components'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { closePopup, openPopup } from '../../../../../lib/modules/popups'
import { TrackPlayPauseButton, ITrack, replacePlaylist, setPlayerPlaylist, IPlaylist } from '../../../../../lib/modules/player'
import { addProductToCart, submitSale } from '../../cart'
import { IContentItem, getContentItemsFromRawList } from '../index'
import { assetHostHostname } from '../../../functions'
import { RootState } from '../../../index'
import { hasTag, contentItemToTrack, hasCategory, getContentItemBySlug } from '../functions'

interface IProps {
  contentItem: IContentItem | null
  filter: string
  category: string

  showPurchaseForm?: boolean
}

function DetailPopUp({
  contentItem,
  filter,
  category,

  showPurchaseForm = true,
}: IProps): ReactElement {
  if (!contentItem) return <div />

  const { activeLiveStream, allContentItems, cartProducts, currentTrackId, playing } = useSelector((state: RootState) => ({
    activeLiveStream: state.app.activeLiveStream,
    allContentItems: state.content.contentItems,
    cartProducts: state.cart.products,
    currentTrackId: state.player.currentTrack?.id,
    playing: state.player.playing,
  }))

  const dispatch = useDispatch()

  const [attachedPlaylist, setAttachedPlaylist] = useState<Partial<IPlaylist>>()
  const [suggestedPrice, setSuggestedPrice] = useState<string>((contentItem ? contentItem.flexPriceRecommended : '0'))
  const [valid, setValid] = useState<boolean>(true)
  const [saleId, setSaleId] = useState<string>()

  useEffect(function init() {
    if (showPurchaseForm) {
      ReactGA.modalview('Detail Popup with Purchase Form: ' + contentItem.title)
    }

    else {
      ReactGA.modalview('Detail Popup without Purchase Form: ' + contentItem.title)
    }

    setSaleId(uuid())

    setTimeout(() => {
      let attachedTracks

      if (hasCategory(contentItem, 'tracks')) {
        attachedTracks = [contentItemToTrack(contentItem)]
      }

      else {
        attachedTracks = getContentItemsFromRawList(allContentItems, contentItem.trackSlugs).map(track =>
          contentItemToTrack(track)
        )
      }

      const playlist = {
        name: 'Current Page',
        tracks: attachedTracks,
      }

      dispatch(replacePlaylist(1, playlist))
      dispatch(setPlayerPlaylist(1))

      setAttachedPlaylist(playlist)
      setSuggestedPrice(contentItem.flexPriceRecommended)
    })
  }, [contentItem.slug])

  const suggestedPriceOnChange = useCallback(
    function suggestedPriceOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      const price = evt.currentTarget.value
      validate(price)
      setSuggestedPrice(price)
    }, [],
  )

  const suggestedPriceOnBlur = useCallback(
    function suggestedPriceOnBlurFn(evt: SyntheticEvent<HTMLInputElement>) {
      setSuggestedPrice(correctPrice(suggestedPrice))
    }, [suggestedPrice],
  )

  const history = useHistory()

  const checkOutOnClick = useCallback(
    function checkOutOnClickFn() {
      if (!validate(suggestedPrice, true)) return
      if (!isInCart(contentItem)) {
        // TODO: contentItemToCartProduct
        dispatch(addProductToCart({
          finalPrice: suggestedPrice,
          isDigitalProduct: contentItem.isDigitalProduct,
          title: contentItem.title,
          slug: contentItem.slug,
          type: contentItem.type,
        }))
      }

      dispatch(closePopup())

      dispatch(openPopup('cart-popup', {
        redirecting: true ,
        returnUrl: `${category}/${contentItem.slug}`,
      }))

      history.push(`/${category}/cart/${filter ? filter : ''}`)

      setTimeout(() => {
        dispatch(submitSale(saleId))
      })

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Instant Download" for: ' + contentItem.title,
      })
    }, [filter, suggestedPrice, category, saleId],
  )

  const addToCartOnClick = useCallback(
    function addToCartOnClickFn() {
      addToCart()
    }, [filter, suggestedPrice, category],
  )

  const formOnSubmit = useCallback(
    function formOnSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()
      addToCart()
    }, [filter, suggestedPrice, category],
  )

  const instantDownloadOnClick = useCallback(
    function instantDownloadOnClickFn() {
      if (!validate(suggestedPrice, true)) return

      dispatch(openPopup('thank-you-popup', { itemSlugs: [contentItem.slug] }))

      history.push('/thank-you')

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Add to cart" in detail popup',
      })
    }, [],
  )

  function validate(price: any, showAlerts = false) {
    if (!contentItem) {
      if (showAlerts) {
        alert('An unknown error has occurred, please reload the page')
      }

      setValid(false)
      return false
    }

    if (isNaN(parseFloat(price))) {
      setValid(false)
      return false
    }

    if (
      !contentItem.hasFixedPrice
      && contentItem.flexPriceMinimum
      && parseFloat(price) < parseFloat(contentItem.flexPriceMinimum)
    ) {
      if (showAlerts) {
        alert(`Sorry, the minimum price is ${contentItem.flexPriceMinimum} €.`)
      }

      setValid(false)
      return false
    }

    setValid(true)
    return true
  }

  function isInCart(contentItem: IContentItem, showAlerts = false) {
    if (find(cartProducts, { slug: contentItem.slug })) {
      if (showAlerts) {
        alert('That item is already in your cart.')
      }
      return true
    }

    return false
  }

  function isPurchaseable(item: IContentItem) {
    if (
      hasCategory(item, 'sound-library')
      || hasCategory(item, 'merch')
      || hasCategory(item, 'venue-calendar')
      // TODO: Get rid of these flags and just use tags
      || (hasCategory(item, 'label') && (item.isDigitalProduct || item.isPhysicalProduct))
    ) {
      return true
    }

    return false
  }

  function addToCart() {
    if (!contentItem) return
    if (!validate(suggestedPrice, true)) return
    if (isInCart(contentItem, true)) return

    dispatch(addProductToCart({
      finalPrice: suggestedPrice,
      isDigitalProduct: contentItem.isDigitalProduct,
      title: contentItem.title,
      slug: contentItem.slug,
      type: contentItem.type,
    }))

    dispatch(closePopup())
    dispatch(openPopup('cart-popup', { returnUrl: `${category}/${filter ? filter : ''}` }))

    history.push(`/${category}/cart/${filter ? filter : ''}`)

    ReactGA.event({
      category: 'User',
      action: 'Clicked "Add to Cart" for: ' + contentItem.title,
    })
  }

  function correctPrice(price: string) {
    const chars = price.split('')

    if (isNaN(parseInt(chars[0], 10))) return price

    let correctedPrice = ''
    let decimalPlace = 0
    for (const char of chars) {
      if (char === ',') {
        if (decimalPlace > 0) {
          break
        }
        correctedPrice = correctedPrice + '.'
        decimalPlace ++
        continue
      }

      if (char === '.') {
        if (decimalPlace > 0) {
          break
        }
        correctedPrice = correctedPrice + char
        decimalPlace ++
        continue
      }

      if (isNaN(parseInt(char))) {
        break
      }

      if (decimalPlace > 2) {
        break
      }

      if (decimalPlace > 0) {
        decimalPlace ++
      }

      correctedPrice = correctedPrice + char
    }

    correctedPrice = correctedPrice.replace(/\.$/, '')

    const correctedPriceSplit = correctedPrice.split('.')

    if (
      correctedPriceSplit.length > 0
      && parseInt(correctedPriceSplit[1], 10) === 0
    ) {
      correctedPrice = correctedPriceSplit[0]
    }

    return correctedPrice
  }

  const assetHost = assetHostHostname()

  const buyNowText = category === 'venue-calendar'
    ? 'Buy Ticket'
    : 'Check out'

  const addToCartText = category === 'venue-calendar'
    ? 'Add to Cart'
    : 'Add to Cart'

  const chooseYourPriceText = category === 'venue-calendar'
    ? 'Choose your ticket price!'
    : 'Choose your price!'

  if (!contentItem) return (<div />)

  return (
    <section
      className={`
        detail-popup
        ${showPurchaseForm ? '' : 'purchase-form-hidden'}
        with-photography
      `}
    >
      <Scrollbars noScrollX={true}>
        <header>
          <div className="detail-popup-title">
            <h1>{ contentItem.title }</h1>
            <h2 dangerouslySetInnerHTML={{ __html: contentItem.secondaryTitle }} />
          </div>
          <div
            className="detail-popup-key-art-image"
            style={{
              backgroundImage: `url(${assetHost}/hem-rocks/content/images/key-art/${contentItem.keyArt})`
            }}
          />
          <div className="detail-popup-header-content">
            <div className="detail-popup-actions">
              { isPurchaseable(contentItem) && (
                <div className="detail-popup-form">
                  {contentItem.hasFixedPrice && (
                    <p>{ contentItem.fixedPrice }</p>
                  )}
                  {!contentItem.hasFixedPrice && (
                    <>
                      <label
                        className="suggested-price"
                        htmlFor="suggested-price"
                      >
                        <em>{ chooseYourPriceText }</em><br />
                      </label>
                      <span className="detail-popup-currency-symbol">€</span>
                      <form onSubmit={formOnSubmit}>
                        <input
                          autoComplete="off"
                          min={contentItem.flexPriceMinimum || 0}
                          name="suggested-price"
                          onBlur={suggestedPriceOnBlur}
                          onChange={suggestedPriceOnChange}
                          type="text"
                          value={suggestedPrice}
                        />
                      </form>
                      <small className={
                        isFinite(parseFloat(suggestedPrice))
                        && parseFloat(suggestedPrice) < parseFloat(contentItem.flexPriceMinimum)
                          ? 'invalid-minimum'
                          : ''
                      }>
                        Minimum price: { contentItem.flexPriceMinimum } €
                      </small>
                      {!valid && (
                        <div className="invalid-message">
                          Please enter a valid price.
                        </div>
                      )}
                    </>
                  )}
                  <div className={`
                    detail-popup-buttons clearfix
                    ${valid ? '' : 'invalid'}
                  `}>
                    { parseFloat(suggestedPrice) > 0 && (
                      <button
                        className="action-button"
                        onClick={checkOutOnClick}
                      >
                        { buyNowText }
                      </button>
                    )}
                    { parseInt(suggestedPrice) === 0 && (
                      <button
                        className="action-button"
                        onClick={instantDownloadOnClick}
                      >
                        Download
                      </button>
                    )}
                    <button
                      className="action-button"
                      onClick={addToCartOnClick}
                    >
                      { addToCartText }
                    </button>
                    { isNaN(parseFloat(suggestedPrice)) && (
                      <div className="purchase-form-spinner">
                        <Spinner />
                      </div>
                    )}
                  </div>
                  { contentItem.physicalFormats.length > 1 && (
                    <div className="purchase-form-alternate-formats">
                      <h3>Other Formats</h3>
                      { contentItem.physicalFormats.split('\n').map(slug => {
                        const item = getContentItemBySlug(allContentItems, slug)
                        if (item) {
                          return (
                            <Link
                              key={item.slug}
                              to={`/label/${item.slug}`}
                            >
                              { item.title }
                            </Link>
                          )
                        }
                      })}
                    </div>
                  )}
                </div>
              )}
              { showPurchaseForm && contentItem.acceptingDonations && (
                <div>
                  <h4>Contributing to this project</h4>
                </div>
              )}
            </div>
            { category !== 'venue-calendar' && attachedPlaylist && attachedPlaylist.tracks && attachedPlaylist.tracks.length > 0 && (
              <TrackPlayPauseButton track={attachedPlaylist.tracks[0]} />
            )}
            { category === 'venue-calendar' && activeLiveStream === contentItem.slug && (
              <PlayPauseButton
                onClick={() => {
                  dispatch(closePopup())
                  setTimeout(() => {
                    history.push('/venue/main-stage')
                  })
                }}
                playing={false}
              />
            )}
          </div>
        </header>
        <div className="detail-popup-details">
          {showPurchaseForm && (
            <h2>Details</h2>
          )}
          <div dangerouslySetInnerHTML={{__html: contentItem.description}} />
          <div className="detail-popup-details-sidebar">
            { attachedPlaylist && attachedPlaylist.tracks && attachedPlaylist.tracks.length > 1 && (
              <div className="detail-popup-details-sidebar-section">
                <ul className="detail-popup-details-playlist">
                  { attachedPlaylist.tracks.map(track => (
                    <li
                      className={ playing && currentTrackId === track.id ? 'active' : ''}
                      key={track.id}
                    >
                      <TrackPlayPauseButton track={track} />
                      <span className="detail-popup-details-playlist-text">{ track.title }</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Scrollbars>
    </section>
  )
}

export default DetailPopUp
