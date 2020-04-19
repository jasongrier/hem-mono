import React, { ReactElement, SyntheticEvent, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { find, isNaN } from 'lodash'
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
import LaunchDetailPopupButton from './LaunchDetailPopupButton'

interface IProps {
  contentItem: IContentItem

  showPurchaseForm?: boolean
}

function DetailPopUp({
  contentItem,

  showPurchaseForm = true,
}: IProps): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const [suggestedPrice, setSuggestedPrice] = useState((contentItem ? contentItem.flexPriceRecommended : 0) as any)

  const [valid, setValid] = useState(true)

  useEffect(function init() {
    ReactGA.modalview('Detail Popup: ' + contentItem.name)
  }, [])

  function addToCart(validateOnly = false) {
    const price = parseFloat(suggestedPrice)

    if (!contentItem) {
      // TODO: Show "An unknown error has occurred..."
      return false
    }

    if (isNaN(price)) {
      setValid(false)
      return false
    }

    if (
      !contentItem.hasFixedPrice
      && contentItem.flexPriceMinimum
      && price < contentItem.flexPriceMinimum
    ) {
      alert(`Sorry, the minimum price is ${contentItem.flexPriceMinimum} €.`)
      return false
    }

    if (find(cartProducts, { slug: contentItem.slug })) {
      alert('That item is already in your cart.')
      return false
    }

    if (!validateOnly) {
      dispatch(addProductToCart(contentItem, price))
    }

    return true
  }

  function buttonText(item: IContentItem) {
    if (item.tags.includes('sound-library')) {
      return 'Download'
    }

    else if (item.tags.includes('projects')) {
      return 'Contribute'
    }

    else if (item.tags.includes('label')) {
      return 'Artist\'s Website'
    }
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
    function suggestedPriceOnChange(evt: SyntheticEvent<HTMLInputElement>) {
      setSuggestedPrice(evt.currentTarget.value)
    }, [],
  )

  const buyNowOnClick = useCallback(
    function buyNowOnClickFn() {
      if (!addToCart()) return
      dispatch(closePopup())
      dispatch(openPopup('cart-popup'))
      ReactGA.event({
        category: 'User',
        action: 'Clicked "Checkout Now" for: ' + contentItem.name,
      })
    }, [suggestedPrice],
  )

  const addToCartOnClick = useCallback(
    function addToCartOnClickFn() {
      if (!addToCart()) return
      alert('Item was added to your cart!')
      ReactGA.event({
        category: 'User',
        action: 'Clicked "Add to Cart" for: ' + contentItem.name,
      })
    }, [suggestedPrice],
  )

  const instantDownloadButtonOnClick = useCallback(
    function instantDownloadButtonOnClickFn() {
      if (!addToCart(true)) return
      // Trigger download somehow
      dispatch(openPopup('email-popup'))
      ReactGA.event({
        category: 'User',
        action: 'Clicked "Instant Download" for: ' + contentItem.name,
      })
    }, [suggestedPrice],
  )

  if (!contentItem) return (<div />)

  return (
    <section
      className={`
        detail-popup
        ${showPurchaseForm ? '' : 'purchase-form-hidden'}
        ${usePlacemats(contentItem) ? 'with-placemat' : 'with-photography'}
      `}
    >
      <Scrollbars noScrollX={true}>
        <header>
          { usePlacemats(contentItem) && (
            <Planes />
          )}
          { !usePlacemats(contentItem) && (
            <div
              className="detail-popup-key-art-image"
              style={{
                backgroundImage: `url(${contentItem.images[0].src})`
              }}
            >
              { contentItem.images[0].alt }
            </div>
          )}
          <div className="detail-popup-header-content">
            <div className="detail-popup-title">
              <h1>{ contentItem.name }</h1>
              <h2>{ contentItem.type }</h2>
            </div>
            <div className="detail-popup-actions">
              { !showPurchaseForm && (
                <LaunchDetailPopupButton
                  className="reveal-purchase-form-button"
                  contentItem={contentItem}
                >
                  { buttonText(contentItem) }
                </LaunchDetailPopupButton>
              )}
              { showPurchaseForm && isPurchaseable(contentItem) && (
                <div className="detail-popup-form">
                  {contentItem.hasFixedPrice && (
                    <p>{ contentItem.fixedPrice }</p>
                  )}
                  {!contentItem.hasFixedPrice && (
                    <>
                      <label htmlFor="suggested-price">Name your price!</label>
                      {/* TODO: Use Intl.NumberFormat and type intent timeout to validate and format the state */}
                      <span className="detail-popup-currency-symbol">€</span>
                      <input
                        autoComplete="off"
                        name="suggested-price"
                        onChange={suggestedPriceOnChange}
                        type="text"
                        value={suggestedPrice}
                      />
                      <small>Minimum price: { contentItem.flexPriceMinimum } €, recommended price: { contentItem.flexPriceRecommended } €</small>
                      {!valid && (
                        <div className="invalid-message">
                          Please enter a valid price.
                        </div>
                      )}
                    </>
                  )}
                  <div className="detail-popup-buttons clearfix">
                    { suggestedPrice > 0 && (
                      <>
                        <button
                          className="action-button"
                          onClick={buyNowOnClick}
                        >
                          Check out now
                        </button>
                        <button
                          className="action-button"
                          onClick={addToCartOnClick}
                        >
                          Add to Cart
                        </button>
                        <a
                          className="detail-popup-cart-link"
                          onClick={() => {
                            dispatch(openPopup('cart-popup'))
                          }}
                        >
                          View cart
                        </a>
                      </>
                    )}
                    { parseInt(suggestedPrice, 10) === 0 && (
                      <button
                        className="action-button"
                        onClick={instantDownloadButtonOnClick}
                      >
                        Download
                      </button>
                    )}
                    { suggestedPrice === '' && (
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
            { contentItem.soundCloudTrackId && (
              <TrackPlayPauseButton
                track={{
                  id: contentItem.slug,
                  type: 'soundcloud',
                  resource: contentItem.soundCloudTrackId,
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
