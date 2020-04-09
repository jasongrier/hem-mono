import React, { ReactElement, SyntheticEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { find, isNaN } from 'lodash'
import Scrollbars from 'react-scrollbars-custom'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { closePopup, openPopup } from '../../../../../lib/modules/popups'
import { Planes } from '../../../../../lib/packages/hem-placemats'
import { IProduct, addProductToCart } from '../../products'
import { RootState } from '../../../index'

interface IProps {
  product: IProduct
}

function BuyPopUp({ product }: IProps): ReactElement {
  const { cartProducts } = useSelector((state: RootState) => ({
    cartProducts: state.products.cartProducts,
  }))

  const dispatch = useDispatch()

  const [suggestedPrice, setSuggestedPrice] = useState((product ? product.flexPriceMinimum : 0) as any)
  const [valid, setValid] = useState(true)

  function addToCart() {
    const price = parseFloat(suggestedPrice)

    if (isNaN(price)) {
      setValid(false)
      return false
    }

    if (find(cartProducts, { slug: product.slug })) {
      alert('That item is already in your cart.')
      return false
    }

    dispatch(addProductToCart(product, price))

    return true
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
    }, [suggestedPrice],
  )

  const addToCartOnClick = useCallback(
    function addToCartOnClickFn() {
      if (!addToCart()) return
      alert('Item was added to your cart!')
    }, [suggestedPrice],
  )

  if (!product) return (<div />)

  return (
    <section className="buy-popup">
      <header>
        <Planes />
        <div className="buy-popup-header-content">
          <div className="buy-popup-title">
            <h1>{ product.name }</h1>
            <h2>{ product.type }</h2>
          </div>
          <div className="buy-popup-actions">
            <div className="buy-popup-form">
              {product.hasFixedPrice && (
                <p>{ product.fixedPrice }</p>
              )}
              {!product.hasFixedPrice && (
                <>
                  <label htmlFor="suggested-price">Name your price!</label>
                  <span className="buy-popup-currency-symbol">€</span>
                  <input
                    name="suggested-price"
                    onChange={suggestedPriceOnChange}
                    type="text"
                    value={suggestedPrice}
                  />
                  <small>Minimum price: { product.flexPriceMinimum }</small>
                  {!valid && (
                    <div className="invalid-message">
                      Please enter a valid price.
                    </div>
                  )}
                </>
              )}
              <div className="buy-popup-buttons clearfix">
                <button
                  className="buy-button"
                  onClick={buyNowOnClick}
                >
                  Check out now
                </button>
                <button
                  className="buy-button"
                  onClick={addToCartOnClick}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <PlayPauseButton
            playing={false}
            onClick={() => {}}
          />
        </div>
      </header>
      <div className="buy-popup-details">
        <Scrollbars>
          <h2>Details</h2>
          <div dangerouslySetInnerHTML={{__html: product.description}} />
        </Scrollbars>
      </div>
    </section>
  )
}

export default BuyPopUp
