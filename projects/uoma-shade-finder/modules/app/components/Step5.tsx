import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noop, find } from 'lodash'
import { resetQuiz } from '../index'
import { RootState } from '../../../index'
import ProductTile from './ProductTile'

declare const toneMatrix: any
declare const skinToneOptions: any[]
declare const blurbs: any[]
declare const jsQuizResultsById: any
declare const allProducts: any

function Step5(): ReactElement {
  const {
    currentStep,
    shadeOption,
    skinToneOption,
    subQuizTone,
    subQuizVeins,
    undertoneOption,
   } = useSelector((state: RootState) => ({
    currentStep: state.app.currentStep,
    shadeOption: state.app.shadeOption,
    skinToneOption: state.app.skinToneOption,
    subQuizTone: state.app.subQuizTone,
    subQuizVeins: state.app.subQuizVeins,
    undertoneOption: state.app.undertoneOption,
  }))

  const dispatch = useDispatch()

  if (currentStep === 5) {
    const allVariants = allProducts.reduce((acc: any, product: any) => {
      const variants = product.variants.map((variant: any) => {
        variant.productId = product.id
        return variant
      })

      acc = acc.concat(variants)

      return acc
    }, [])

    const subQuizCodes = {
      aa: 'cool',
      ab: 'neutral',
      ac: 'neutral',
      ad: 'neutral',
      ba: 'neutral',
      bb: 'neutral',
      bc: 'warm',
      bd: 'neutral',
      ca: 'neutral',
      cb: 'neutral',
      cc: 'neutral',
      cd: 'neutral',
    }

    let subQuizUndertoneOption

    if (
      !undertoneOption
      && subQuizTone
      && subQuizVeins
    ) {
      // @ts-ignore
      subQuizUndertoneOption = subQuizCodes[subQuizTone + subQuizVeins]
    }

    // @ts-ignore
    const solution = `${skinToneOption}-t${(parseInt(shadeOption) + 1)}-${subQuizUndertoneOption || undertoneOption}`
    // @ts-ignore
    const mainImage = skinToneOptions[skinToneOption][shadeOption]

    const foundationVariantId = jsQuizResultsById[solution].foundation
    const concealerVariantId = jsQuizResultsById[solution].concealer
    // @ts-ignore
    const contourStickVariantId = parseInt(toneMatrix[skinToneOption].contour, 10)
    const spongeProduct = find(allProducts, { handle: 'big-head-dual-density-makeup-sponge' })
    const spongeVariant = spongeProduct.variants[0]

    const foundationVariant = find(allVariants, { id: foundationVariantId })
    const foundationProduct = find(allProducts, { id: foundationVariant.productId })
    const concealerVariant = find(allVariants, { id: concealerVariantId })
    const concealerProduct = find(allProducts, { id: concealerVariant.productId })

    const contourStickVariant = find(allVariants, { id: contourStickVariantId })
    const contourStickProduct = find(allProducts, { id: contourStickVariant.productId })

    // @ts-ignore
    const subhead = toneMatrix[skinToneOption].subhead
    const blurb = blurbs[subhead]

    return (
      <div className="step-content step-5">
        <h1>You are...</h1>
        <h1 className="solution-banner">Brown Sugar Brown Sugar Brown Sugar Brown Sugar Brown Sugar Brown Sugar Brown Sugar Brown Sugar Brown Sugar Brown Sugar</h1>
        <div className="solution-layout">
          <div className="solution-layout-row solution-hero-container">
            <div className="solution-product solution-product-foundation">
              <ProductTile
                ctaOnClick={() => {}}
                ctaText="Add to bag"
                imgSrc={foundationVariant.featured_image.src}
                price={`$${foundationVariant.price / 100}.00`}
                reviewsCount="43"
                starsCount={4}
                subtitle={`in ${foundationVariant.title}`}
                title={foundationProduct.title}
              />
            </div>
            <div className="solution-hero">
              <div
                className="solution-hero-pic"
                style={{
                  background: `url(${mainImage}) center center no-repeat`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="solution-hero-text">
                <h2>{ foundationVariant.title.replace(' - ', ' ') }</h2>
                <h3>
                  { subhead }
                </h3>
                <p>{ blurb }</p>
                <h2 className="solution-page-scroll">Shop Now</h2>
              </div>
            </div>
          </div>
          <div className="solution-scroll-container">
            <h3>Scroll for More</h3>
            <span className="solution-chevron"></span>
          </div>
          <div className="solution-layout-row">
            <ProductTile
              ctaOnClick={() => {}}
              ctaText="Add to bag"
              imgSrc={concealerVariant.featured_image.src}
              price={`$${concealerVariant.price / 100}.00`}
              reviewsCount="43"
              starsCount={4}
              subtitle={`in ${concealerVariant.title}`}
              title={concealerProduct.title}
            />
            <ProductTile
              ctaOnClick={() => {}}
              ctaText="Add to bag"
              imgSrc={contourStickVariant.featured_image.src}
              price={`$${contourStickVariant.price / 100}.00`}
              reviewsCount="43"
              starsCount={4}
              subtitle={`in ${contourStickVariant.title}`}
              title={contourStickProduct.title}
            />
            <ProductTile
              ctaOnClick={() => {}}
              ctaText="Add to bag"
              imgSrc={spongeVariant.featured_image.src}
              price={`$${spongeVariant.price / 100}.00`}
              reviewsCount="43"
              starsCount={4}
              subtitle={`in ${spongeVariant.title}`}
              title={spongeProduct.title}
            />
          </div>
          <div className="solution-layout-row">
            <div
              className="reset-quiz"
              onClick={() => dispatch(resetQuiz())}
            >
              <button>Restart the Quiz</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else {
    return <div></div>
  }
}

export default Step5
