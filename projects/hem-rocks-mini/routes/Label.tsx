import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PopupContainer, openPopup } from '../../../lib/modules/popups'
import { setCurrentProduct } from '../modules/products'
import { RootState } from '../index'

function Label(): ReactElement {
  const { allProducts } = useSelector((state: RootState) => ({
    allProducts: state.products.products,
  }))

  const dispatch = useDispatch()

  const releases = allProducts.filter(product => product.tags.includes('label'))

  // TODO: Duplicated code in the other routes. How to refactor this?
  function launchBuyPopup(release) {
    dispatch(setCurrentProduct(release))
    dispatch(openPopup('buy-popup'))
  }

  return (
    <div className="page page-label">
      <h1>Label</h1>

    </div>
  )
}

export default Label
