import { AnyAction } from 'redux'
import uuid from 'uuid/v1'
import { IState } from './index'

function fakeProduct(tag: string) {
  return {
    description: '',
    featureList: [],
    fixedPrice: null,
    flexPriceMinimum: 0,
    hasFixedPrice: false,
    id: uuid(),
    images: [],
    tags: [tag],
    title: 'Foo',
    videos: [],
  }
}

const initialState: IState = {
  products: [
    fakeProduct('sound-library'),
    fakeProduct('sound-library'),
    fakeProduct('sound-library'),
    fakeProduct('label'),
    fakeProduct('label'),
    fakeProduct('label'),
    fakeProduct('compilation'),
    fakeProduct('compilation'),
    fakeProduct('compilation'),
    fakeProduct('products'),
    fakeProduct('products'),
    fakeProduct('products'),
  ],
}

const reducer = (
  state: IState = initialState,
  { type }: AnyAction,
): IState => {
  switch (type) {
    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
