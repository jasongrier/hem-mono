import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../../lib/modules/popups'
import { setCurrentProduct, IProduct } from '../modules/products'

interface IProps {
  product: IProduct
}

function LaunchBuyPopupButton({ product }: IProps): ReactElement {
  const dispatch = useDispatch()

  const onClick = useCallback(
    function onClickFn() {
      dispatch(setCurrentProduct(product))
      dispatch(openPopup('buy-popup'))
    }, [],
  )

  return (
    <button
      className="buy-button"
      onClick={onClick}
    >
      Download
    </button>
  )
}

export default LaunchBuyPopupButton
