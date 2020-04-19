import React, { ReactElement, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { IContentItem } from '../../content'
import { RootState } from '../../../index'
import { removeProductFromCart } from '../actions'
import { closePopup } from '../../../../../lib/modules/popups'

function CartPopup(): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const checkoutOnClick = useCallback(
    function checkoutOnClickFn() {
      // Shopify stuff...
      ReactGA.event({
        category: 'User',
        action: 'Clicked "Checkout" in shopping cart for',
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
            <div className="cart-popup-checkout">
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
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default CartPopup
