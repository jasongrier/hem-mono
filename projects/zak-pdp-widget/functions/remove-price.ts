import { trim } from 'voca'

function removePrice(title: string) {
  return trim(title.split(/[\+\$]/)[0].replace(' – ', ''))
}

export default removePrice
