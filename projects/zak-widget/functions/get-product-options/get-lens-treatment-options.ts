import { kebabCase } from 'voca'
import { IPrescriptionOption, PrescriptionType } from '../../store/types'
import getRawOptions from './get-raw-options'

function getLensTreatmentOptions() {
  const rawOptions = getRawOptions()
  const rawLensTreatmentOptions = rawOptions.find((option: any) => option.name === 'Lens Treatment')

  if (!rawLensTreatmentOptions) return []

  return rawLensTreatmentOptions.values.reduce((acc: IPrescriptionOption[], text: string, index: number) => {
    const textSplit = text.split('+$')

    acc.push({
      index,
      price: textSplit[1] ? parseInt(textSplit[1], 10) : 0,
      text,
      value: kebabCase(textSplit[0]) as PrescriptionType,
    })

    return acc
  }, [])
}

export default getLensTreatmentOptions
