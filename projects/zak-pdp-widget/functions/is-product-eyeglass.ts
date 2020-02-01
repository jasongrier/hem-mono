import { IProduct } from '../store/types'

function isProductEyeglass(product: IProduct) {
  return product.theme.split(' ')[1] === 'Eyeglass'
}

export default isProductEyeglass
