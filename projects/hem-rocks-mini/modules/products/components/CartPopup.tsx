import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { IProduct } from '../../products'
import { RootState } from '../../../index'
import { removeProductFromCart } from '../actions'

function CartPopup(): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.products.cartProducts,
  }))

  const dispatch = useDispatch()

  function getFinalPrice(product: IProduct) {
    let price

    if (product.hasFixedPrice) {
      price = product.fixedPrice
    }

    else {
      price = product.userSuggestedPrice
    }

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
          <div className="cart-popup-items">
            {cartProducts.map(product => (
              <div className="cart-popup-item">
                <div className="cart-popup-item-remove">
                  <CloseButton
                    onClick={() => {
                      dispatch(removeProductFromCart(product.id))
                    }}
                  />
                </div>
                <h2>{product.name}</h2>
                <p>{ product.type }</p>
                <div className="cart-popup-item-price">{ getFinalPrice(product) }</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPopup
