import { AnyAction } from 'redux'
import uuid from 'uuid/v1'
import { IState } from './index'

function fakeProduct(tag: string) {
  return {
    blurb: "I'm baby austin flexitarian artisan typewriter vice tofu crucifix. Pinterest truffaut stumptown, raw denim offal viral four dollar toast man bun. Church-key cardigan authentic, microdosing chambray literally seitan quinoa mixtape man bun. Viral meggings master cleanse 90's affogato raclette.",
    description: "I'm baby austin flexitarian artisan typewriter vice tofu crucifix. Pinterest truffaut stumptown, raw denim offal viral four dollar toast man bun. Church-key cardigan authentic, microdosing chambray literally seitan quinoa mixtape man bun. Viral meggings master cleanse 90's affogato raclette.",
    featureList: [],
    fixedPrice: null,
    flexPriceMinimum: 0,
    hasFixedPrice: false,
    id: uuid(),
    images: [],
    tags: [tag],
    title: 'Grand Piano',
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
