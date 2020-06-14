import { AnyAction } from 'redux'

export interface IAnnotation {
  body: string
  category: string
  id: string
  tags: string
  timestamp: string
  title: string
}

export interface IState {
  annotations: IAnnotation[]
}

export const ADD_ANNOTATION = 'ADD_ANNOTATION'
export const REMOVE_ANNOTATION = 'REMOVE_ANNOTATION'

export interface IAddAnnotation extends AnyAction {
  type: typeof ADD_ANNOTATION
  payload: IAnnotation
}

export interface IRemoveAnnotation extends AnyAction {
  type: typeof REMOVE_ANNOTATION
  payload: string
}

export type Action =
  IAddAnnotation
  | IRemoveAnnotation

export {
  addAnnotation,
  removeAnnotation,
} from './actions'

// TODO: Export all components here. Write a linter for it
export { App } from './components'
export {  } from './functions'
export { reducer as appReducer } from './reducer'
export { annotationsSaga } from './sagas'
