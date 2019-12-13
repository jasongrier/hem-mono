import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

declare const PDP_WIDGET_MAIN_IMAGE_URL: string

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
          <img src={PDP_WIDGET_MAIN_IMAGE_URL} alt={productTitle} />
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
