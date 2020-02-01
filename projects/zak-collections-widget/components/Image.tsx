import React, { ReactElement } from 'react'
import { find } from 'lodash'

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
        let url

        if (currentThemeHandle) {
          url = `/products/${item.handle}?preselected-theme=${currentThemeHandle}`
        }

        else {
          url = `/products/${item.handle}`
        }

        window.location.pathname = url
      }}
    >
      <img src={currentImageUrl} />
    </div>
  )
}

export default Image
