import React, { ReactElement, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ReactGA from 'react-ga'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { Spinner } from '../../../../../lib/components'
import { closePopup, openPopup } from '../../../../../lib/modules/popups'
import Scrollbars from 'react-scrollbars-custom'
import { RootState } from '../../../index'
import { removeProductFromCart } from '../actions'
import PayPalCartUpload from './PayPalCartUpload'

interface IProps {
  redirecting: boolean
}

function CartPopup({ redirecting: alreadyRedirecting }: IProps): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
    redirecting: state.cart.redirecting,
  }))

  const dispatch = useDispatch()

  const [redirecting, setRedirecting] = useState(false)

  useEffect(function init() {
    if (alreadyRedirecting) {
      setRedirecting(true)
    }
  }, [alreadyRedirecting])

  const history = useHistory()

  const checkoutOnClick = useCallback(
    function checkoutOnClickFn() {
      setRedirecting(true)
      // @ts-ignore
      const form = document.getElementById('pay-pal-cart-upload-form')
      // @ts-ignore
      form.submit()

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Check out" in shopping cart form',
      })
    }, [],
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
                className="action-button action-button-wide"
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
                    className="cart-popup-item"
                    key={product.slug}
                  >
                    <div className="cart-popup-item-remove">
                      <CloseButton
                        onClick={() => {
                          ReactGA.event({
                            category: 'User',
                            action: 'Clicked "remove" in shopping cart for ' + product.name,
                          })
                          dispatch(removeProductFromCart(product.slug))
                        }}
                      />
                    </div>
                    <h2>{product.name}</h2>
                    <p>{ product.type }</p>
                    <div className="cart-popup-item-price">{ product.finalPrice } €</div>
                  </div>
                ))}
              </Scrollbars>
            </div>
            <div className="cart-popup-totals">
              Subtotal: { formatPrice(getSubotal()) }<br />
              {/* Tax: { formatPrice(getTax()) }<br /> */}
              <strong>TOTAL: { formatPrice(getGrandTotal()) }</strong>
            </div>
            <div className="cart-popup-check-out">
              <button
                className="action-button continue-button"
                onClick={() => {
                  dispatch(closePopup())
                }}
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
              <PayPalCartUpload
                items={cartProducts.map(product => ({
                  amount: parseFloat(product.finalPrice),
                  name: product.name,
                  slug: product.slug,
                }))}
              />
            </div>
          </>
        )}
        {redirecting && (
          <div className="cart-popup-redirecting-overlay">
            <div className="cart-popup-redirecting-overlay-content">
              <h2>Checkin' you out!</h2>
              <p>Please enjoy the spinners while we get you over to PayPal</p>
              <Spinner />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPopup
