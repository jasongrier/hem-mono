import { AnyAction } from 'redux'
import {
  ADD_FILE,

  IFile,
} from './index'

const addFile = (file: Partial<IFile>): AnyAction => ({
  type: ADD_FILE,
  payload: file,
})

export {
  addFile,
}
