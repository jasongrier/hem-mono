import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { getCurrentVariant } from '../functions'

function SideLeft(): ReactElement {
  const product = useSelector((state: RootState) => state.app.product)

  if (!product) return <div />

  const { defaultImageUrl, description } = product

  getCurrentVariant(product)

  const currentVariant = null
  const currentImageUrl = currentVariant && currentVariant.featured_image ? currentVariant.featured_image : defaultImageUrl

  return (
    <div className="zw-left">
      <div className="zw-info">
        <div className="zw-main-image">
          <img src={currentImageUrl} />
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
