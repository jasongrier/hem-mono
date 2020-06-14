import { AnyAction } from 'redux'
import {
  ADD_ANNOTATION,
  REMOVE_ANNOTATION,

  IAnnotation,
} from './index'

const addAnnotation = (annotation: Partial<IAnnotation>): AnyAction => ({
  type: ADD_ANNOTATION,
  payload: annotation,
})

const removeAnnotation = (id: string): AnyAction => ({
  type: REMOVE_ANNOTATION,
  payload: id,
})

export {
  addAnnotation,
  removeAnnotation,
}
