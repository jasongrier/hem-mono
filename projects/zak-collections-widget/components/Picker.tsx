import React, { ReactElement, useCallback } from 'react'
import { find, reduce } from 'lodash'
import { kebabCase, titleCase } from 'voca'
import SwatchPicker from '../../zak-pdp-widget/components/SwatchPicker'
import getThemeAvailability from '../../zak-pdp-widget/functions/rules/get-theme-availability'

interface IProps {
  currentVariantId: string
  item: any
  onThemeSelected: (variantId: string, themeKebab: string) => void
  options: any[]
}

function Picker({ currentVariantId, item, onThemeSelected, options }: IProps): ReactElement {
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
      console.log(themeKebab)
      onThemeSelected(variant.id, themeKebab)
    }, []
  )

  return (
    <div className="zw-item-picker">
      <SwatchPicker
        onChange={swatchPickerOnChange}
        options={themeOptions}
        availabilities={themeAvailabilities}
        value={kebabCase(currentTheme)}
      />
    </div>
  )
}

export default Picker
