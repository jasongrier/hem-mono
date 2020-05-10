import React, { ReactElement, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noop } from 'lodash'
import ReactGA from 'react-ga'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { Spinner } from '../../../../../lib/components'
import { closePopup } from '../../../../../lib/modules/popups'
import Scrollbars from 'react-scrollbars-custom'
import { IContentItem } from '../../content'
import { RootState } from '../../../index'
import { removeProductFromCart } from '../actions'
import PayPalCartUpload from './PayPalCartUpload'

interface IProps {
  redirecting: boolean
  returnUrl: string
}

function CartPopup({ redirecting: alreadyRedirecting, returnUrl }: IProps): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const [redirecting, setRedirecting] = useState(false)

  useEffect(function init() {
    if (alreadyRedirecting) {
      setRedirecting(true)
    }
  }, [alreadyRedirecting])

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

  function getFinalPrice(product: IContentItem): number {
    let price = 0

    if (product.hasFixedPrice && product.fixedPrice) {
      price = product.fixedPrice
    }

    else {
      price = product.userSuggestedPrice || product.flexPriceMinimum || 0
    }

    return price
  }

  function getSubotal() {
    // @ts-ignore
    return cartProducts.reduce((acc: number, product: IProduct) => {
      return acc + getFinalPrice(product)
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
      <Scrollbars noScrollX={true}>
        <header>
          <h1>Shopping cart</h1>
        </header>
        <div className="cart-popup-content">
          {!!!cartProducts.length && (
            <div className="cart-popup-empty">
              Your cart is empty.
            </div>
          )}
          {!!cartProducts.length && (
            <>
              <div className="cart-popup-items">
                {cartProducts.map(product => (
                  <div
                    className="cart-popup-item"
                    key={product.id}
                  >
                    <div className="cart-popup-item-remove">
                      <CloseButton
                        onClick={() => {
                          ReactGA.event({
                            category: 'User',
                            action: 'Clicked "remove" in shopping cart for ' + product.name,
                          })
                          dispatch(removeProductFromCart(product.id))
                        }}
                      />
                    </div>
                    <h2>{product.name}</h2>
                    <p>{ product.type }</p>
                    <div className="cart-popup-item-price">{ formatPrice(getFinalPrice(product)) }</div>
                  </div>
                ))}
              </div>
              <div className="cart-popup-totals">
                Subtotal: { formatPrice(getSubotal()) }<br />
                Tax: { formatPrice(getTax()) }<br />
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
                <button
                  className="action-button"
                  onClick={checkoutOnClick}
                  type="submit"
                >
                  Check out
                </button>
                <PayPalCartUpload
                  returnUrl={returnUrl}
                  items={cartProducts.map(product => ({
                    amount: getFinalPrice(product),
                    name: product.name,
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
      </Scrollbars>
    </section>
  )
}

export default CartPopup
