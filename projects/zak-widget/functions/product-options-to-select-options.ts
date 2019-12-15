import { ICustomSelectOption } from '../components/CustomSelect'
import { IProductOption } from '../store/types'
import productOptionToTitle from './product-option-to-title'

function productOptionsToSelectOptions(options: IProductOption[]): ICustomSelectOption[] {
  return options.map(o => ({
    name: productOptionToTitle(o),
    value: o.name,
  }))
}

export default productOptionsToSelectOptions
