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
    fakeProduct('archive'),
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
