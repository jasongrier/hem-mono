import { isNaN } from 'lodash'

function extractPrice(title: string): number {
  const titleSplit = title.split('$')
  if (!titleSplit[1]) return 0

  const price = parseInt(titleSplit[1], 10)
  if (isNaN(price)) return 0

  return price
}

export default extractPrice
