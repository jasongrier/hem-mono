import { AnyAction } from 'redux'
import produce from 'immer'
import {
  LOAD_PRODUCT,
  SET_LENS_COLOR,
  SET_SWATCH_TYPE,

  IState,
} from './types'

const tempProduct = {
  description: `
    <p>Unisex. Classic proportions. Constructed with high quality acetate and adjusted for a symmetrical fit. Lightweight Polycarbonate lens, AR coating to block glare, and 100% UV-A and UV-B protection. Paired with Zak. case, cleaning cloth and spray.</p>
  `,
  hasHighIndexAddOn: false,
  id: 'temp-product',
  imageUrl: '/static/assets/images/fpo-pdp-main.jpg',
  lensColor: 'lens-gray' as 'lens-gray',
  secondaryTitle: 'foo',
  swatchType: 'eyeglass-black' as 'eyeglass-black',
  title: 'The Round Eyeglass',
}

const initialState: IState = {
  // product: null,
  product: tempProduct,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction, // TODO: Why doesn't Saga like union types?
): IState => {
  switch (type) {
    case LOAD_PRODUCT: {
      return state
    }

    case SET_LENS_COLOR: {
      return produce(state, draftState => {
        draftState.product.lensColor = payload
      })
    }

    case SET_SWATCH_TYPE: {
      return produce(state, draftState => {
        draftState.product.swatchType = payload
      })
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
