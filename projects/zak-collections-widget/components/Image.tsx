import React, { ReactElement } from 'react'
import { find } from 'lodash'
import { productClicked } from '../functions'

interface IProps {
  currentThemeHandle: string
  currentVariantId: string
  item: any
}

function Image({ currentVariantId, currentThemeHandle, item }: IProps): ReactElement {
  const currentVariant = find(item.variants, { id: currentVariantId })
  const currentImageUrl = currentVariant && currentVariant.featured_image ? currentVariant.featured_image.src : item.defaultImageUrl

  return (
    <div
      className="zw-item-image"
      onClick={() => {
        productClicked(item, currentThemeHandle)
      }}
    >
      <img src={currentImageUrl} />
    </div>
  )
}

export default Image
