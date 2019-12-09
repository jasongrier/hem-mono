import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function SideLeft(): ReactElement {
  const { description, imageUrl, productTitle } = useSelector((state: RootState) => {
    const product = state.app.product
    return {
      description: product && product.description,
      imageUrl: product && product.imageUrl,
      productTitle: product && product.title,
    }
  })

  return (
    <div className="zw-left">
      <div className="zw-info">
        <div className="zw-main-image">
          <img src="/static/assets/images/fpo-pdp-main.jpg" alt={productTitle} />
        </div>
        <div className="zw-description-container">
          <div
            className="zw-description"
            dangerouslySetInnerHTML={{__html: description}}
          />
        </div>
      </div>
    </div>
  )
}

export default SideLeft
