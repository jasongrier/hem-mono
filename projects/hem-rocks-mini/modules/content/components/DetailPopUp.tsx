import React, { ReactElement, SyntheticEvent, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { find, isFinite, isNaN, isNumber } from 'lodash'
import Scrollbars from 'react-scrollbars-custom'
import ReactGA from 'react-ga'
import { Spinner } from '../../../../../lib/components'
import { closePopup, openPopup } from '../../../../../lib/modules/popups'
import { TrackPlayPauseButton } from '../../../../../lib/modules/player'
import { Planes } from '../../../../../lib/packages/hem-placemats'
import { addProductToCart } from '../../cart'
import { IContentItem } from '../../content'
import { usePlacemats } from '../../../functions'
import { RootState } from '../../../index'

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

  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const [suggestedPrice, setSuggestedPrice] = useState((contentItem ? contentItem.flexPriceRecommended : 0) as any)

  const [valid, setValid] = useState(true)

  useEffect(function init() {
    if (showPurchaseForm) {
      ReactGA.modalview('Detail Popup with Purchase Form: ' + contentItem.name)
    }

    else {
      ReactGA.modalview('Detail Popup without Purchase Form: ' + contentItem.name)
    }
  }, [])

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
    ) {
      return true
    }

    return false
  }

  const suggestedPriceOnChange = useCallback(
    function suggestedPriceOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      const price = evt.currentTarget.value
      validate(price)
      setSuggestedPrice(price)
    }, [],
  )

  const history = useHistory()

  const checkOutOnClick = useCallback(
    function checkOutOnClickFn() {
      if (!validate(suggestedPrice, true)) return
      if (!isInCart(contentItem)) {
        dispatch(addProductToCart(contentItem, suggestedPrice))
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
        action: 'Clicked "Instant Download" for: ' + contentItem.name,
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

  function addToCart() {
    if (!validate(suggestedPrice, true)) return
    if (isInCart(contentItem, true)) return

    dispatch(addProductToCart(contentItem, suggestedPrice))
    dispatch(closePopup())
    dispatch(openPopup('cart-popup', { returnUrl: `${tag}/${filter ? filter : ''}` }))

    history.push(`/${tag}/cart/${filter ? filter : ''}`)

    ReactGA.event({
      category: 'User',
      action: 'Clicked "Add to Cart" for: ' + contentItem.name,
    })
  }

  if (!contentItem) return (<div />)

  return (
    <section
      className={`
        detail-popup
        ${showPurchaseForm ? '' : 'purchase-form-hidden'}
        with-placemat
        with-photography-x
      `}
    >
      <Scrollbars noScrollX={true}>
        <header>
          <Planes />
          {/* <div
            className="detail-popup-key-art-image"
            style={{
              backgroundImage: `url(http://static.hem.rocks/hem-rocks/content/images/${contentItem.slug}.jpg)`
            }}
          /> */}
          <div className="detail-popup-header-content">
            <div className="detail-popup-title">
              <h1>{ contentItem.name }</h1>
              <h2>{ contentItem.type }</h2>
            </div>
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
                        <em>Choose your price!</em><br />
                        {/* <small>Type, or click in the box and use the &uarr; &darr; arrow keys</small> */}
                      </label>
                      {/* TODO: Use Intl.NumberFormat and type intent timeout to validate and format the state */}
                      <span className="detail-popup-currency-symbol">€</span>
                      <form onSubmit={formOnSubmit}>
                        <input
                          autoComplete="off"
                          min={contentItem.flexPriceMinimum || 0}
                          name="suggested-price"
                          onChange={suggestedPriceOnChange}
                          type="text"
                          value={suggestedPrice}
                        />
                      </form>
                      { isNumber(contentItem.flexPriceMinimum) && (
                        <small className={
                          isFinite(parseFloat(suggestedPrice))
                          && suggestedPrice < contentItem.flexPriceMinimum
                          ? 'invalid-minimum' : ''
                        }>
                          Minimum price: { contentItem.flexPriceMinimum } €
                        </small>
                      )}
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
                    { suggestedPrice > 0 && (
                      <button
                        className="action-button"
                        onClick={checkOutOnClick}
                      >
                        Check out
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
                      Add to Cart
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
            { contentItem.trackId && (
              <TrackPlayPauseButton
                track={{
                  attribution: contentItem.attribution,
                  id: contentItem.slug,
                  type: 'soundcloud',
                  resource: contentItem.trackId,
                }}
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
