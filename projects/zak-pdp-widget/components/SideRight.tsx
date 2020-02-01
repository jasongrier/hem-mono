import { reduce } from 'lodash'
import React, { ReactElement, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { kebabCase, titleCase } from 'voca'
import { RootState } from '../store'
import {
  allProductIds,
  getHighIndexOption,
  getLensTreatmentOptions,
  getProductOptions,
  getProductTotalPrice,
  getThemeTitle,
  getTintOptions,
  productOptionToTitle,
  removePrice,
} from '../functions'

import {
  getFieldVisibility,
  getThemeAvailability,
} from '../functions/rules'

import {
  setLensColor,
  setLensTreatment,
  setPrescription,
  setTheme,
  setTint,
  toggleHighIndexAddOn,
} from '../store/actions'

import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'

declare function doAddToCart(mainProduct, allProductIds: string[]): void

function SideRight(): ReactElement {
  const { product } = useSelector((state: RootState) => ({
    product: state.app.product,
  }))

  const dispatch = useDispatch()

  if (!product) return <div />

  const {
    description,
    hasHighIndexAddOn,
    lensColor,
    lensTreatment,
    prescription,
    theme,
    tint,
    title,
  } = product

  const highIndexOption = getHighIndexOption()
  const lensColorOptions = getProductOptions('Lens Color', product, true)
  const lensTreatmentOptions = getLensTreatmentOptions()
  const prescriptionOptions = getProductOptions('Prescription', product, true)
  const rawThemeOptions = getProductOptions('Theme')
  const tintOptions = getTintOptions()

  const themeTitle = getThemeTitle(theme)
  const total = getProductTotalPrice(product)
  const hasPrescription = removePrice(prescription) !== 'No Prescription'

  const {
    showLensColorPicker,
    showPrescriptionOptions,
    showLensTreatmentOptions,
    showTintOptions,
  } = getFieldVisibility(product)

  let lensColorTitle
  if (lensColor !== 'NA') {
    lensColorTitle = `. <span class="lens-color-title">${lensColor} Lens</span>`
  }

  const themeOptions = rawThemeOptions.map(kebabCase)
  const themeAvailabilities = reduce(themeOptions, (acc, option) => {
    acc[option] = getThemeAvailability(titleCase(option).replace(/-/g, ' '))
    return acc
  }, {})

  return (
    <div className="zw-right">
      <div className="zw-product-options">
        <h2>{ title }</h2>
        <h3>
          <span className="theme-title">{ themeTitle }</span>
          { lensColorTitle &&
            <span dangerouslySetInnerHTML={{
              __html: lensColorTitle
            }}/>
          }
        </h3>
        <div className="zw-primary-picker">
          <SwatchPicker
            onChange={(themeKebab: string) => dispatch(setTheme(titleCase(themeKebab.replace(/-/g, ' '))))}
            options={themeOptions}
            availabilities={themeAvailabilities}
            value={kebabCase(theme)}
          />
        </div>
        { showLensColorPicker && (
          <div className="zw-lens-picker">
            <SwatchPicker
              onChange={value => dispatch(setLensColor(value))}
              optionKeyTransform={value => `lens-${value.toLowerCase()}`}
              options={lensColorOptions}
              title="Lens color:"
              value={lensColor}
            />
          </div>
        )}
        <a
          className="zw-fit-guide-link zw-plus-left"
          data-remodal-target="fit-guide-view"
          onClick={() => {}}
        >
          Fit Guide
        </a>
        { showPrescriptionOptions && (
          <OptionRow
            label="Prescription"
            action={{
              remodalTarget: 'prescription-options-view',
              text: 'Do you have questions?',
            }}
            select={{
              onChange: (name: string) => dispatch(setPrescription(name)),
              options: prescriptionOptions.map(o => ({ name: o, value: o })),
              value: productOptionToTitle(prescription),
            }}
          />
        )}
        { showLensTreatmentOptions && (
          <OptionRow
            label="Lens Treatment"
            action={{
              remodalTarget: 'lens-treatment-options-view',
              text: 'What’s right for me?',
            }}
            select={{
              onChange: (name: string) => dispatch(setLensTreatment(name)),
              options: lensTreatmentOptions.map(o => ({ name: o, value: o })),
              value: productOptionToTitle(lensTreatment),
            }}
          />
        )}
        { showTintOptions && (
          <OptionRow
            label="Tints"
            className="zw-last-option-row"
            action={{
              remodalTarget: 'tint-options-view',
              text: 'Customize it!',
            }}
            select={{
              onChange: (name: string) => dispatch(setTint(name)),
              options: tintOptions.map(o => ({ name: o, value: o })),
              value: productOptionToTitle(tint),
            }}
          />
        )}
        <div className="zw-total-row">
          <div className="zw-total">
            ${ total }
          </div>
          { hasPrescription && (
            <div
              className="zw-add-on"
              onClick={() => dispatch(toggleHighIndexAddOn())}
            >
              <button className={`zw-add-on-button ${hasHighIndexAddOn ? 'zw-add-on-button-active' : ''}`} />
              <span className="zw-add-on-label">
                { highIndexOption }
              </span>
            </div>
          )}
        </div>
        <div className="zw-submit-row">
          <button
            className="zw-submit-button"
            onClick={() => doAddToCart(product, allProductIds(product))}
          >
            Add to Cart
          </button>
          <form
            action="/cart/add"
            className="pdp-form zw-upload-rx-button-form"
            encType="multipart/form-data"
            method="POST"
            style={{
              height: hasPrescription ? '40px' : '0',
            }}
          >
            <input
              className="id-input"
              name="id"
              type="hidden"
            />
            { hasPrescription &&
              <button id="zw-upload-rx-button">
                <span className="zw-upload-rx-button-text">
                  Upload RX
                  <span className="ion-ios-arrow-thin-right" />
                </span>
                  <input
                    id="zw-upload-rx-input"
                    name="properties[Uploaded Prescription File]"
                    type="file"
                  />
              </button>
            }
          </form>
          { hasPrescription &&
            <>
              <a
                className="zw-more-info-link zw-plus-left"
                data-remodal-target="upload-options-view"
              >
                More info
              </a>
              <p className="zw-patient-info">
                If you’re a Zak. patient or have ordered with us in the past, we have your prescription on file. You do not need to upload it. Just check out!
              </p>
            </>
          }
          <div
            className="zw-description-mobile"
            dangerouslySetInnerHTML={{__html: description}}
          />
        </div>
      </div>
    </div>
  )
}

export default SideRight
