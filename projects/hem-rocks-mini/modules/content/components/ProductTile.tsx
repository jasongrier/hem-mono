import React, { ReactElement } from 'react'
import { IProduct } from '../index'

interface IProps {
  product: IProduct
}

function ProductTile({ product }: IProps): ReactElement {
  const productImage = product.images[0]

  return (
    <article className="product-tile">
      <h1>{ product.name }</h1>
      {productImage && (
        <img
          src={product.images[0].src}
          alt={product.images[1].src}
        />
      )}
      <ul>
        {product.featureList && product.featureList.map(featureBlurb =>
          <li>{ featureBlurb }</li>
        )}
      </ul>
      <div className="product-tile-cta-buttons">
        <button>Download</button>
        <button>Watch the tutorial ></button>
      </div>
    </article>
  )
}

export default ProductTile
