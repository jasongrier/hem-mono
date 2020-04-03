import { AnyAction } from 'redux'
import uuid from 'uuid/v1'
import { IState } from './index'

function fakeProduct(tag: string) {
  return {
    id: uuid(),
    name: 'Foo',
    tags: [tag],
    description: '',
    hasFixedPrice: false,
    fixedPrice: null,
    flexPriceMinimum: 0,
  }
}

const initialState: IState = {
  products: [
    fakeProduct('sl1'),
    fakeProduct('sl1'),
    fakeProduct('sl1'),
    fakeProduct('sl2'),
    fakeProduct('sl2'),
    fakeProduct('sl2'),
    fakeProduct('past-releases'),
    fakeProduct('past-releases'),
    fakeProduct('past-releases'),
    fakeProduct('archive'),
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
