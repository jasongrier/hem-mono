import { IProductOption } from '../store/types'

declare const PDP_PRODUCT_OPTIONS_WITH_VALUES: string

function getProductOptions(optionName: string): IProductOption[] {
  const rawOptions = JSON.parse(PDP_PRODUCT_OPTIONS_WITH_VALUES)
  const rawOption = rawOptions.find(o => o.name === optionName)

  if (!rawOption) return []

  return rawOption.values.reduce((acc, name) => {
    const nameSplit = name.split(' – ')

    const price = nameSplit[1]
      ? parseInt(nameSplit[1].replace(/[\+\$]+/, ''))
      : 0

    acc.push({
      name: nameSplit[0],
      price,
    })

    return acc
  }, [])
}

export default getProductOptions
