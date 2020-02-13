import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'
import ProductTile from './ProductTile'

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

  console.log(currentStep)

  if (currentStep === 5) {
    console.log('shadeOption', shadeOption)
    console.log('skinToneOption', skinToneOption)
    console.log('subQuizTone', subQuizTone)
    console.log('subQuizVeins', subQuizVeins)
    console.log('undertoneOption', undertoneOption)
  }

  return (
    <div className="step-content step-5">
      <h1>You are...</h1>
      <div className="solution-layout">
        <div className="solution-layout-row">
          <div className="solution-product solution-product-foundation">
            <ProductTile
              ctaOnClick={() => {}}
              ctaText="Shop now"
              imgSrc="http://placekitten.com/1000/1000"
              price="$39.00 USD"
              reviewsCount="43"
              starsCount={4}
              subtitle="in Brown Sugar - T4W"
              title="Say What?! Foundation"
            />
          </div>
          <div className="solution-hero">
            <div className="solution-hero-pic" >
              <img src="http://placekitten.com/900/900" alt=""/>
            </div>
            <div className="solution-hero-text">
              <h2>Brown Sugar T2C</h2>
              <h3>
              Lorem ipsum dolor sit amet.
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
            </div>
          </div>
        </div>
        <div className="solution-layout-row">
          <ProductTile
            ctaOnClick={() => {}}
            ctaText="Add to bag"
            imgSrc="http://placekitten.com/1000/1000"
            price="$39.00 USD"
            reviewsCount="43"
            starsCount={4}
            subtitle="in Brown Sugar - T4W"
            title="Say What?! Foundation"
          />
          <ProductTile
            ctaOnClick={() => {}}
            ctaText="Add to bag"
            imgSrc="http://placekitten.com/1000/1000"
            price="$39.00 USD"
            reviewsCount="43"
            starsCount={4}
            subtitle="in Brown Sugar - T4W"
            title="Say What?! Foundation"
          />
          <ProductTile
            ctaOnClick={() => {}}
            ctaText="Add to bag"
            imgSrc="http://placekitten.com/1000/1000"
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
