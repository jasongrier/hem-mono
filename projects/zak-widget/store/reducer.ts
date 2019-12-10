import { AnyAction } from 'redux'
import {
  LOAD_PRODUCT,

  IState,
} from './types'

const tempProduct = {
  description: `
    <p>Unisex. Classic proportions. Constructed with high quality acetate and adjusted for a symmetrical fit. Lightweight Polycarbonate lens, AR coating to block glare, and 100% UV-A and UV-B protection. Paired with Zak. case, cleaning cloth and spray.</p>
  `,
  hasHighIndexAddOn: false,
  id: 'temp-product',
  imageUrl: '/static/assets/images/fpo-pdp-main.jpg',
  secondaryTitle: 'foo',
  title: 'The Round Eyeglass',
}

const initialState: IState = {
  // product: null,
  product: tempProduct,
}

const reducer = (
  state: IState = initialState,
  { type }: AnyAction,
): IState => {
  switch (type) {
    case LOAD_PRODUCT: {
      return state
    }

    default: {
      return state
    }
  }
}

export {
  initialState,
  reducer,
}
