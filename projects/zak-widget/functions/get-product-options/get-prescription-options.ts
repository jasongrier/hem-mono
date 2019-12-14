import { kebabCase } from 'voca'
import { IPrescriptionOption, PrescriptionType } from '../../store/types'
import getRawOptions from './get-raw-options'

function getPrescriptionOptions() {
  const rawOptions = getRawOptions()
  const rawPrescriptionOptions = rawOptions.find((option: any) => option.name === 'Prescription')

  if (!rawPrescriptionOptions) return []

  return rawPrescriptionOptions.values.reduce((acc: IPrescriptionOption[], text: string, index: number) => {
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

export default getPrescriptionOptions
