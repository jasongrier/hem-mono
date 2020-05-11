import React, { ReactElement, useCallback } from 'react'
import { find, reduce } from 'lodash'
import { kebabCase, titleCase } from 'voca'
import SwatchPicker from '../../zak-pdp-widget/components/SwatchPicker'
import getThemeAvailability from '../../zak-pdp-widget/functions/rules/get-theme-availability'
import { productClicked } from '../functions'

interface IProps {
  currentVariantId: string
  currentThemeHandle: string
  item: any
  onThemeSelected: (variantId: string, themeKebab: string) => void
  options: any[]
}

function Picker({ currentVariantId, currentThemeHandle, item, onThemeSelected, options }: IProps): ReactElement {
  const themeOptionsSpec = find(options, { name: 'Theme' })
  const currentVariant = find(item.variants, {id: currentVariantId})

  if (!themeOptionsSpec || !currentVariant) return (
    <div></div>
  )

  const themeOptions = themeOptionsSpec.values.map(kebabCase)
  const currentTheme = kebabCase(currentVariant.option3)

  const themeAvailabilities = reduce(themeOptions, (acc, option) => {
    acc[option] = getThemeAvailability(titleCase(option).replace(/-/g, ' '), item)
    return acc
  }, {} as any)

  const swatchPickerOnChange = useCallback(
    function swatchPickerOnChange(themeKebab: string) {
      var themeName = titleCase(themeKebab).replace(/-/g, ' ')
      var variant = find(item.variants, {option3: themeName})
      onThemeSelected(variant.id, themeKebab)
    }, []
  )

  const productOnClick = useCallback(
    function productOnClickFn() {
      productClicked(item, currentThemeHandle)
    }, [item, currentThemeHandle],
  )

  return (
    <div className="zw-item-picker">
      <SwatchPicker
        onChange={swatchPickerOnChange}
        options={themeOptions}
        availabilities={themeAvailabilities}
        value={kebabCase(currentTheme)}
      />
      <div
        className="shop-now-button mobile-shop-now-button"
        onClick={productOnClick}
      >
        Shop Now
      </div>
    </div>
  )
}

export default Picker
