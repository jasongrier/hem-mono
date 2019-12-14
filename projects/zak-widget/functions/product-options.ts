import { kebabCase } from 'voca'
import { IPrescriptionOption, PrescriptionType } from '../store/types'

declare const PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES: string

function productOptions() {
  const rawOptions = JSON.parse(PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES)

  // console.log(rawOptions)

  const rawPrescriptionOptions = rawOptions.find((option: any) => option.name === 'Prescription')

  let prescriptionOptions: IPrescriptionOption[] = []

  if (rawPrescriptionOptions) {
    prescriptionOptions = rawPrescriptionOptions.values.reduce((acc: IPrescriptionOption[], text: string, index: number) => {
      const textSplit = text.split('$')

      acc.push({
        index,
        price: parseInt(textSplit[1], 10),
        text,
        value: kebabCase(textSplit[0]) as PrescriptionType,
      })

      return acc
    }, [])
  }

  return {
    prescriptionOptions,
  }
}

export default productOptions
