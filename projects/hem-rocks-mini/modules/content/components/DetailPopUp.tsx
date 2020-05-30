import React, { ReactElement, SyntheticEvent, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { find, isFinite, isNaN, isNumber } from 'lodash'
import Scrollbars from 'react-scrollbars-custom'
import ReactGA from 'react-ga'
import { Spinner } from '../../../../../lib/components'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { closePopup, openPopup } from '../../../../../lib/modules/popups'
import { TrackPlayPauseButton, ITrack } from '../../../../../lib/modules/player'
import { addProductToCart } from '../../cart'
import { IContentItem } from '../../content'
import { assetHostHostname } from '../../../functions'
import { RootState } from '../../../index'
import { hasTag, contentItemToTrack } from '../functions'

interface IProps {
  contentItem: IContentItem | null
  filter: string
  tag: string

  showPurchaseForm?: boolean
}

function DetailPopUp({
  contentItem,
  filter,
  tag,

  showPurchaseForm = true,
}: IProps): ReactElement {
  if (!contentItem) return <div />

  const { activeLiveStream, allContentItems, cartProducts } = useSelector((state: RootState) => ({
    activeLiveStream: state.app.activeLiveStream,
    allContentItems: state.content.contentItems,
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const [suggestedPrice, setSuggestedPrice] = useState<string>((contentItem ? contentItem.flexPriceRecommended : '0'))
  const [track, setTrack] = useState<ITrack>()

  const [valid, setValid] = useState(true)

  useEffect(function init() {
    if (showPurchaseForm) {
      ReactGA.modalview('Detail Popup with Purchase Form: ' + contentItem.title)
    }

    else {
      ReactGA.modalview('Detail Popup without Purchase Form: ' + contentItem.title)
    }
  }, [])

  useEffect(function findTrack() {
    let trackItem: IContentItem

    if (hasTag(contentItem, 'track')) {
      trackItem = contentItem
    }

    else if (contentItem.trackSlug) {
      trackItem = allContentItems.find(item => item.slug === contentItem.trackSlug)
    }

    if (!trackItem) return

    setTrack(contentItemToTrack(trackItem, `/tracks/${contentItem.slug}`))
  }, [allContentItems])

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
        dispatch(addProductToCart({
          finalPrice: suggestedPrice,
          name: contentItem.title,
          slug: contentItem.slug,
          type: contentItem.type,
        }))
      }

      dispatch(closePopup())

      dispatch(openPopup('cart-popup', {
        redirecting: true ,
        returnUrl: `${tag}/${contentItem.slug}`,
      }))

      history.push(`/${tag}/cart/${filter ? filter : ''}`)

      setTimeout(() => {
        // @ts-ignore
        const form = document.getElementById('pay-pal-cart-upload-form')
        // @ts-ignore
        form.submit()
      })

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Instant Download" for: ' + contentItem.title,
      })
    }, [filter, suggestedPrice, tag],
  )

  const addToCartOnClick = useCallback(
    function addToCartOnClickFn() {
      addToCart()
    }, [filter, suggestedPrice, tag],
  )

  const formOnSubmit = useCallback(
    function formOnSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()
      addToCart()
    }, [filter, suggestedPrice, tag],
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
      && price < contentItem.flexPriceMinimum
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
      item.tags.includes('sound-library')
      || item.tags.includes('merch')
      || item.tags.includes('venue-calendar')
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
      name: contentItem.title,
      slug: contentItem.slug,
      type: contentItem.type,
    }))

    dispatch(closePopup())
    dispatch(openPopup('cart-popup', { returnUrl: `${tag}/${filter ? filter : ''}` }))

    history.push(`/${tag}/cart/${filter ? filter : ''}`)

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

  const buyNowText = tag === 'venue-calendar'
    ? 'Buy Ticket'
    : 'Check out'

  const addToCartText = tag === 'venue-calendar'
    ? 'Add to Cart'
    : 'Add to Cart'

  const chooseYourPriceText = tag === 'venue-calendar'
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
              backgroundImage: `url(${assetHost}/hem-rocks/content/images/key-art/${contentItem.slug}.jpg)`
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
                        && suggestedPrice < contentItem.flexPriceMinimum
                        ? 'invalid-minimum' : ''
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
                </div>
              )}
              { showPurchaseForm && contentItem.acceptingDonations && (
                <div>
                  <h4>Contributing to this project</h4>
                </div>
              )}
            </div>
            { track && (
              <TrackPlayPauseButton track={track} />
            )}
            { tag === 'venue-calendar' && activeLiveStream === contentItem.slug && (
              <PlayPauseButton
                onClick={() => {
                  dispatch(closePopup())
                  setTimeout(() => {
                    history.push("/venue/main-stage")
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
        </div>
      </Scrollbars>
    </section>
  )
}

export default DetailPopUp
