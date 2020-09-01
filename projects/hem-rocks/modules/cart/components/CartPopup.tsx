import React, { ReactElement, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { find } from 'lodash'
import ReactGA from 'react-ga'
import uuid from 'uuid/v1'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { Spinner } from '../../../../../lib/components'
import { closePopup, openPopup, setPopupsFrozen } from '../../../../../lib/modules/popups'
import Scrollbars from 'react-scrollbars-custom'
import { RootState } from '../../../index'
import { removeProductFromCart, submitSale } from '../actions'
import { assetHostHostname } from '../../../functions'
import PayPalCartUpload from './PayPalCartUpload'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import { getContentItemBySlug } from '../../content'

interface IProps {
  redirecting: boolean
}

function CartPopup({ redirecting: alreadyRedirecting }: IProps): ReactElement {
  const { cartProducts, cartContentItems } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
    cartContentItems: state.cart.products.map(product => getContentItemBySlug(state.content.contentItems, product.slug)),
  }))

  const dispatch = useDispatch()

  const [redirecting, setRedirecting] = useState<boolean>(false)
  const [saleId, setSaleId] = useState<string>()

  useEffect(function init() {
    if (alreadyRedirecting) {
      setRedirecting(true)
    }

    setSaleId(uuid())
  }, [alreadyRedirecting])

  const history = useHistory()

  const checkoutOnClick = useCallback(
    function checkoutOnClickFn() {
      if (!saleId) return
      
      setRedirecting(true)
      dispatch(setPopupsFrozen(true))
      dispatch(submitSale(saleId))

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Check out" in shopping cart form',
      })
    }, [saleId],
  )

  const downloadOnClick = useCallback(
    function downloadOnClickFn() {
      dispatch(openPopup('thank-you-popup', { itemSlugs: cartProducts.map(product => product.slug) }))

      history.push('/thank-you')

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Download" (all free products) in shopping cart form',
      })
    }, [],
  )

  function getSubotal() {
    // @ts-ignore
    return cartProducts.reduce((acc: number, product: IProduct) => {
      return acc + parseFloat(product.finalPrice)
    }, 0)
  }

  function getTax() {
    return 0
  }

  function getGrandTotal() {
    return getSubotal() + getTax()
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
  }

  const assetHost = assetHostHostname()

  return (
    <section className="cart-popup">
      <header>
        <h1>Shopping cart</h1>
      </header>
      <div className="cart-popup-content">
        {!!!cartProducts.length && (
          <div className="cart-popup-empty">
            <p>
              Your cart is empty.
            </p>
            <p>
              <button
                className="action-button action-button-super-wide"
                onClick={() => dispatch(closePopup())}
              >
                Close this window and go back
              </button>
            </p>
          </div>
        )}
        {!!cartProducts.length && (
          <>
            <div className="cart-popup-items">
              <Scrollbars noScrollX={true}>
                {cartProducts.map(product => (
                  <div
                    className="cart-popup-item clearfix"
                    key={product.slug}
                  >
                    <div className="bsp-cart-thumbnail">
                      { BERLIN_STOCK_PHOTOS && (
                        <img 
                          // @ts-ignore
                          alt={find(cartContentItems || [], { slug: product.slug}).secondaryTitle}
                          // @ts-ignore
                          src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${find(cartContentItems || [], { slug: product.slug}).keyArt}`}
                        />
                      )}
                    </div>
                    <div className="cart-item-info">
                      <h2>{ BERLIN_STOCK_PHOTOS && 'Photo #' }{ product.title }</h2>
                      <p>
                        { product.type }<br />
                        <small>
                          { product.type === 'Stock Photo' && 'Image file(s): 3008 x 2000 JPEG' }
                          { BERLIN_STOCK_PHOTOS && !product.isDigitalProduct && 'A3 format (approximately 18" x 24")' }
                          { BERLIN_STOCK_PHOTOS && parseFloat(product.finalPrice) >= 20 && product.isDigitalProduct && ' + RAW' }
                        </small>
                        <br />
                        <a
                          className="cart-popup-item-remove"
                          onClick={() => {
                            ReactGA.event({
                              category: 'User',
                              action: 'Clicked "remove" in shopping cart for ' + product.title,
                            })
                            dispatch(removeProductFromCart(product.slug))
                          }}
                        >
                          remove
                        </a>
                      </p>
                    </div>
                    <div className="cart-popup-item-price">{ product.finalPrice } €</div>
                  </div>
                ))}
              </Scrollbars>
            </div>
            <div className="cart-popup-totals" hidden>
              {/* Subtotal: { formatPrice(getSubotal()) }<br /> */}
              <strong>TOTAL: { formatPrice(getGrandTotal()) }</strong>
            </div>
            <div className="cart-popup-check-out">
              <span>TOTAL: { formatPrice(getGrandTotal()) }</span>
              <button
                className="action-button continue-button"
                onClick={() => dispatch(closePopup())}
              >
                Continue shopping
              </button>
              { getGrandTotal() === 0 && (
                <button
                  className="action-button"
                  onClick={downloadOnClick}
                  type="submit"
                >
                  Download
                </button>
              )}
              { getGrandTotal() > 0 && (
                <button
                  className="action-button"
                  onClick={checkoutOnClick}
                  type="submit"
                >
                  Check out
                </button>
              )}
              <small>
                <a href="/stock-photos-license" target="_blank">Read the License Agreement</a>
              </small>
            </div>
          </>
        )}
        {redirecting && (
          <div className="cart-popup-redirecting-overlay">
            <div className="cart-popup-redirecting-overlay-content">
              <h2>Thanks!</h2>
              <p>Just a sec, we are redirecting you to PayPal.</p>
              <p>You do not need a PayPal account to proceed.</p>
              <p><strong>Please do not close this window!</strong></p>
              {/* <p className="shipping-warning">
                <strong>Don't forget to confirm your shipping address in PayPal!</strong>
              </p> */}
              <Spinner />
            </div>
          </div>
        )}
        <PayPalCartUpload
          items={cartProducts.map(product => ({
            amount: parseFloat(product.finalPrice),
            slug: product.slug,
            title: product.title,
            type: product.type,
            isNondigitalProduct: product.isDigitalProduct === false,
          }))}
        />
      </div>
    </section>
  )
}

export default CartPopup
