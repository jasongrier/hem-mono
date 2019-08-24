import { AnyAction } from 'redux'
import { IState } from './types'

const initialState: IState = {
  articles: {
    'foo': {
      title: 'Foo',
      text: 'Lorem ipsum dolor\n\nsit amet.',
      links: [
        { type: 'external', text: 'Google', title: 'Search engine', destination: 'http://google.com' },
        { type: 'internal', text: 'Foo', title: 'I link to myself', destination: 'foo' },
      ],
      seoMeta: {
        description: '',
        keywords: '',
      }
    }
  }
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
