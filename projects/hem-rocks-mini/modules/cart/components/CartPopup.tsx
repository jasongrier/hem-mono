import React, { ReactElement, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { IContentItem } from '../../content'
import { RootState } from '../../../index'
import { removeProductFromCart, shopifyCheckOut } from '../actions'
import { closePopup } from '../../../../../lib/modules/popups'
import { Spinner } from '../../../../../lib/components'

declare const paypal: any

function CartPopup(): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const [redirecting, setRedirecting] = useState(false)

  useEffect(function initPayPal() {
    paypal.Buttons().render('#paypal-button-container')
  }, [])

  const checkoutOnClick = useCallback(
    function checkoutOnClickFn() {
      dispatch(shopifyCheckOut(
        // @ts-ignore
        cartProducts.map(p => p.shopifyHandle),
        // @ts-ignore
        cartProducts.map(p => getFinalPrice(p)),
      ))

      setRedirecting(true)

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Check out" in shopping cart for',
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
              >
                Check out
              </button>
              <div id="paypal-button-container"></div>
            </div>
          </>
        )}
        {redirecting && (
          <div className="cart-popup-redirecting-overlay">
            <div className="cart-popup-redirecting-overlay-content">
              <h2>Yay!</h2>
              <p>Checkin' you out now...</p>
              <Spinner />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPopup
