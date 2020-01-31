import React, { ReactElement } from 'react'
import { find } from 'lodash'

interface IProps {
  currentVariantId: string
  item: any
}

function Image({ currentVariantId, item }: IProps): ReactElement {
  const { defaultImageUrl } = item

  const currentVariant = find(item.variants, { id: currentVariantId })
  const currentImageUrl = currentVariant && currentVariant.featured_image ? currentVariant.featured_image.src : defaultImageUrl

  return (
    <div className="zw-item-image">
      <img src={currentImageUrl} />
    </div>
  )
}

export default Image
