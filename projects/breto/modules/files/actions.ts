import { AnyAction } from 'redux'
import {
  ADD_FILES,
  ADD_FOLDER,
} from './index'

const addFiles = (filePaths: string[]): AnyAction => ({
  type: ADD_FILES,
  payload: filePaths,
})

const addFolder = (): AnyAction => ({
  type: ADD_FOLDER,
  payload: null,
})

export {
  addFiles,
  addFolder,
}
