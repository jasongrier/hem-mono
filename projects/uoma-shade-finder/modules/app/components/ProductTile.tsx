import React, { ReactElement } from 'react'

interface IProps {
  ctaOnClick: () => void
  ctaText: string
  imgSrc: string
  price: string
  reviewsCount: string
  starsCount: number
  subtitle: string
  title: string
}

function ProductTile({ ctaOnClick, ctaText, imgSrc, price, reviewsCount, starsCount, subtitle, title }: IProps): ReactElement {
  return (
    <div
      className="product-tile"
      onClick={ctaOnClick}
    >
      <img src={imgSrc} />
      <h2 className="product-title">
        { title }
      </h2>
      <h3 className="product-subtitle">
        { subtitle }
      </h3>
      <p className="product-price">
        { price }
      </p>
      <div className="product-reviews">
        <div className="product-reviews-stars">
          <div className={`product-reviews-star ${starsCount > 1 ? 'product-reviews-star-active' : ''}`} />
          <div className={`product-reviews-star ${starsCount > 2 ? 'product-reviews-star-active' : ''}`} />
          <div className={`product-reviews-star ${starsCount > 3 ? 'product-reviews-star-active' : ''}`} />
          <div className={`product-reviews-star ${starsCount > 4 ? 'product-reviews-star-active' : ''}`} />
          <div className={`product-reviews-star ${starsCount > 5 ? 'product-reviews-star-active' : ''}`} />
        </div>
        <div className="product-reviews-count">
          {reviewsCount} reviews
        </div>
      </div>
      <div className="product-cta">
        <button>{ ctaText }</button>
      </div>
    </div>
  )
}

export default ProductTile
