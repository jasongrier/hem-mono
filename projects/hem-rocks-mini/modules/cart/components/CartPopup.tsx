import React, { ReactElement, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import Scrollbars from 'react-scrollbars-custom'
import { IContentItem } from '../../content'
import { RootState } from '../../../index'
import { removeProductFromCart } from '../actions'
import { closePopup } from '../../../../../lib/modules/popups'

declare const paypal: any

function CartPopup(): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.cart.products,
  }))

  const dispatch = useDispatch()

  const [redirecting, setRedirecting] = useState(false)

  useEffect(function initPayPal() {
    if (!redirecting) return
    paypal.Buttons({
      createOrder: function(data: any, actions: any) {
        var itemsData = ({name: "Basic Class Fee", unit_amount: {currency_code: "EUR",value: "50.00"},quantity: "1"})
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: "EUR",
              value: "50.00",
              breakdown: {
                item_total: {
                  currency_code: "EUR",
                  value: "50.00"
                }
              }
            },
            items: [(itemsData)]
          }]
        })
      }
    }).render('#paypal-button-container')
  }, [redirecting])

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
          {redirecting && (
            <div className="cart-popup-redirecting-overlay">
              <div className="cart-popup-redirecting-overlay-content">
                <h2>Choose payment method</h2>
                <div id="paypal-button-container"></div>
              </div>
            </div>
          )}
        </div>
      </Scrollbars>
    </section>
  )
}

export default CartPopup
