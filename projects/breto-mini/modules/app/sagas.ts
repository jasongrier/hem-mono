import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  ADD_ANNOTATION,
  REMOVE_ANNOTATION,
} from './index'

function* addAnnotation() {
  try {
    // Midi stuff...
  }

  catch (err) {
    console.log(err)
  }
}

function* removeAnnotation() {
  try {
    // Midi stuff...
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* annotationsSaga() {
  yield takeLatest(ADD_ANNOTATION, addAnnotation)
  yield takeLatest(REMOVE_ANNOTATION, removeAnnotation)
}

export {
  annotationsSaga,
}
