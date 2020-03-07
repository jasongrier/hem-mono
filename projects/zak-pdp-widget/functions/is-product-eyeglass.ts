import { IProduct } from '../store/types'
import { last } from 'lodash'

function isProductEyeglass(product: IProduct) {
  return last(product.theme.split(' ')) === 'Eyeglass'
}

export default isProductEyeglass
