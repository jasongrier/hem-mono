import React, { ReactElement, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { closePopup } from '../../../../../lib/modules/popups'
import { Spinner } from '../../../../../lib/components'
import { IContentItem } from '../../content'
import { RootState } from '../../../index'
import { removeProductFromCart, shopifyCheckOut } from '../actions'

function CartPopup(): ReactElement {
  const { cartProducts, redirecting } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
    redirecting: state.cart.redirecting,
  }))

  const dispatch = useDispatch()

  const checkoutOnClick = useCallback(
    function checkoutOnClickFn() {
      dispatch(shopifyCheckOut(
        // @ts-ignore
        cartProducts.map(p => p.shopifyHandle),
        // @ts-ignore
        cartProducts.map(p => getFinalPrice(p)),
      ))

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
            </div>
          </>
        )}
      </div>

      <form
        action="https://hem-web-shop-dev-j.myshopify.com/cart"
        id="checkout-form"
        method="POST"
      >
      </form>

      { redirecting && (
        <div className="cart-popup-redirect-overlay">
          <div>
            <h2>Yay!</h2>
            <p>We're completing your order!</p>
            <Spinner />
          </div>
        </div>
      )}
    </section>
  )
}

export default CartPopup
