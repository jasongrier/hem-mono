import React, { ReactElement, SyntheticEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { requestPurchase } from '../modules/products'
import { RootState } from '../../../index'

function requestPurchase(product: IProduct, suggestedPrice?: number) {

}

interface IProps {
  product: IProduct
}

function BuyPopUp({ product }: IProps): ReactElement {
  const {  } = useSelector((state: RootState) => ({

  }))

  const dispatch = useDispatch()

  const [suggestedPrice, setSuggestedPrice] = useState(product ? product.flexPriceMinimum : 0)

  const suggestedPriceOnChange = useCallback(
    function suggestedPriceOnChange(evt: SyntheticEvent<HTMLInputElement>) {
      setSuggestedPrice(
        parseInt(evt.currentTarget.value, 10)
      )
    }, [],
  )

  const onSubmit = useCallback(
    function onSubmit(evt: SyntheticEvent<HTMLFormElement>) {
      dispatch(requestPurchase(product, suggestedPrice))
    }, [],
  )

  return (
    <div className="pop-up buy-pop-up">
      {!product && (
        <div />
      )}
      {product && (
        <>
          <h1>{ product.name }</h1>
          <p dangerouslySetInnerHTML={{__html: product.description}} />
          <form onSubmit={onSubmit}>
            {product.hasFixedPrice && (
              <p>{ product.fixedPrice }</p>
            )}
            {!product.hasFixedPrice && (
              <>
                <label htmlFor="minimum-price">Suggest a price</label>
                <input
                  name="minimum-price"
                  onChange={suggestedPriceOnChange}
                  type="text"
                  value={suggestedPrice}
                />
                <small>Minimum price: { product.flexPriceMinimum }</small>
              </>
            )}
            <button type="submit"></button>
          </form>
        </>
      )}
    </div>
  )
}

export default BuyPopUp
