import React, { ReactElement } from 'react'
import { find, reduce } from 'lodash'
import { kebabCase, titleCase } from 'voca'
import SwatchPicker from '../../zak-pdp-widget/components/SwatchPicker'
import getThemeAvailability from '../../zak-pdp-widget/functions/rules/get-theme-availability'

interface IProps {
  currentVariantId: string
  item: any
  onThemeSelected: (theme: string) => void
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

  return (
    <div className="zw-item-picker">
      <SwatchPicker
        onChange={(themeKebab: string) => onThemeSelected(titleCase(themeKebab.replace(/-/g, ' ')))}
        options={themeOptions}
        availabilities={themeAvailabilities}
        value={kebabCase(currentTheme)}
      />
    </div>
  )
}

export default Picker
