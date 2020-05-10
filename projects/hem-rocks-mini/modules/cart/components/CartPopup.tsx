import React, { ReactElement, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import Scrollbars from 'react-scrollbars-custom'
import { IContentItem } from '../../content'
import { RootState } from '../../../index'
import { removeProductFromCart } from '../actions'
import { closePopup } from '../../../../../lib/modules/popups'

function CartPopup(): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const [redirecting, setRedirecting] = useState(false)

  const checkoutOnClick = useCallback(
    function checkoutOnClickFn() {
      setRedirecting(true)

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
                <form
                  // action="https://www.sandbox.paypal.com/cgi-bin/webscr"
                  action="https://www.paypal.com/cgi-bin/webscr"
                  method="post"
                  target="_blank"
                >
                  <button
                    className="action-button continue-button"
                    onClick={() => {
                      dispatch(closePopup())
                    }}
                  >
                    Continue shopping
                  </button>
                  <input type="hidden" name="cmd" value="_cart" />
                  <input type="hidden" name="upload" value="1" />
                  {/* <input type="hidden" name="business" value="sb-d7jtv1699928@business.example.com" /> */}
                  <input type="hidden" name="business" value="paypal@hem.rocks" />
                  <input type="hidden" name="item_name_1" value="Item Name 1" />
                  <input type="hidden" name="amount_1" value="1.00" />
                  <input type="hidden" name="shipping_1" value="1.75" />
                  <input type="hidden" name="item_name_2" value="Item Name 2" />
                  <input type="hidden" name="amount_2" value="2.00" />
                  <input type="hidden" name="shipping_2" value="2.50" />
                  <button
                    className="action-button"
                    onClick={checkoutOnClick}
                    type="submit"
                  >
                    Check out
                  </button>
                </form>
              </div>
            </>
          )}
          {redirecting && (
            <div className="cart-popup-redirecting-overlay">
              <div className="cart-popup-redirecting-overlay-content">
                <h2>Yay!</h2>
                <p>Checkin' you out</p>
              </div>
            </div>
          )}
        </div>
      </Scrollbars>
    </section>
  )
}

export default CartPopup
