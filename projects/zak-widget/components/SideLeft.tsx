import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { getProduct } from '../functions'

function SideLeft(): ReactElement {
  const { description, productTitle } = useSelector((state: RootState) => {
    const product = state.app.product
    return {
      description: product && product.description,
      productTitle: product && product.title,
    }
  })

  return (
    <div className="zw-left">
      <div className="zw-info">
        <div className="zw-main-image">
          <img src={getProduct().mainImageUrl} alt={productTitle} />
        </div>
        <div
          className="zw-description"
          dangerouslySetInnerHTML={{__html: description}}
        />
      </div>
    </div>
  )
}

export default SideLeft
