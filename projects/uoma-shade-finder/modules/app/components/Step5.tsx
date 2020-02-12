import React, { ReactElement } from 'react'
import ProductTile from './ProductTile'

function Step5(): ReactElement {
  return (
    <div className="step-content step-5">
      <h1>You are...</h1>
      <div className="solution-layout">
        <div className="solution-layout-row">
          <div className="solution-product solution-product-foundation">
            <ProductTile
              ctaOnClick={() => {}}
              ctaText="Shop now"
              imgSrc="http://placekitten.com/100/100"
              price="$39.00 USD"
              reviewsCount="43"
              starsCount={4}
              subtitle="in Brown Sugar - T4W"
              title="Say What?! Foundation"
            />
          </div>
          <div className="solution-hero">
            <div className="solution-hero-pic">
              <img src="" alt=""/>
            </div>
            <div className="solution-hero-text">
              <h2>Brown Sugar T2C</h2>
              <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
            </div>
          </div>
        </div>
        <div className="solution-layout-row">
          <ProductTile
            ctaOnClick={() => {}}
            ctaText="Add to bag"
            imgSrc="http://placekitten.com/100/100"
            price="$39.00 USD"
            reviewsCount="43"
            starsCount={4}
            subtitle="in Brown Sugar - T4W"
            title="Say What?! Foundation"
          />
          <ProductTile
            ctaOnClick={() => {}}
            ctaText="Add to bag"
            imgSrc="http://placekitten.com/100/100"
            price="$39.00 USD"
            reviewsCount="43"
            starsCount={4}
            subtitle="in Brown Sugar - T4W"
            title="Say What?! Foundation"
          />
          <ProductTile
            ctaOnClick={() => {}}
            ctaText="Add to bag"
            imgSrc="http://placekitten.com/100/100"
            price="$39.00 USD"
            reviewsCount="43"
            starsCount={4}
            subtitle="in Brown Sugar - T4W"
            title="Say What?! Foundation"
          />
        </div>
      </div>
    </div>
  )
}

export default Step5
