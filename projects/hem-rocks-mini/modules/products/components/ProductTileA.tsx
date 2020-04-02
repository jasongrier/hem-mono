import React, { ReactElement } from 'react'

interface IProps {
  featureList: string[]
  imgAlt: string
  imgSrc: string
  productId: string
  title: string
  videoPopUpId: string
}

function ProductTileA({
  featureList,
  imgAlt,
  imgSrc,
  productId,
  title,
  videoPopUpId,
}: IProps): ReactElement {
  return (
    <article className="product-tile-a">
      <h1>{ title }</h1>
      <img
        src={imgSrc}
        alt={imgAlt}
      />
      <ul>
        {featureList.map(featureBlurb =>
          <li>Supports multiple Seurat devices per track for more complex patterns</li>
        )}
      </ul>
      <div className="product-tile-a-cta-buttons">
        <button>Download</button>
        <button>Watch the tutorial ></button>
      </div>
    </article>
  )
}

export default ProductTileA
