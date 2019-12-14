import { kebabCase } from 'voca'
import { IProductOption, PrescriptionType } from '../../store/types'
import getRawOptions from './get-raw-options'

function getTintOptions() {
  const rawOptions = getRawOptions()
  const rawTintOptions = rawOptions.find((option: any) => option.name === 'Tints')

  if (!rawTintOptions) return []

  return rawTintOptions.values.reduce((acc: IProductOption[], text: string, index: number) => {
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

export default getTintOptions
