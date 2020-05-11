import React, { ReactElement, useCallback } from 'react'
import { productClicked } from '../functions'

interface IProps {
  collectionTitle: string
  currentThemeHandle: string
  item: any
}

function Title({ collectionTitle, currentThemeHandle, item }: IProps): ReactElement {

  const productOnClick = useCallback(
    function productOnClickFn() {
      productClicked(item, currentThemeHandle)
    }, [item, currentThemeHandle],
  )

  return (
    <div className="zw-item-title">
      <a
        href="#"
        onClick={productOnClick}
      >
        <h2>{item.title.replace(collectionTitle, '')}</h2>
        <p>{ item.tags[0] }</p>
        <div
          className="shop-now-button"
          onClick={productOnClick}
        >
          Shop Now
        </div>
      </a>
    </div>
  )
}

export default Title
