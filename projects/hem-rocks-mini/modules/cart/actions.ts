import {
  SHOPIFY_ADD_TO_CART,

  Action,
} from './index'

const shopifyAddToCart = (productHandle: string, price: number): Action => ({
  type: SHOPIFY_ADD_TO_CART,
  payload: { productHandle, price },
})

export {
  shopifyAddToCart,
}
