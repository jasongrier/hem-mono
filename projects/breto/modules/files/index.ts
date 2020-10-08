import { AnyAction } from 'redux'

export interface IState {
  files: string[]
}

export const ADD_FILES = 'ADD_FILES'
export const ADD_FOLDER = 'ADD_FOLDER'

export interface IAddFiles extends AnyAction {
  type: typeof ADD_FILES
  payload: string[]
}

export interface IAddFolder extends AnyAction {
  type: typeof ADD_FOLDER
  payload: null
}

export type Action =
  IAddFiles
  | IAddFolder

export {
  addFiles,
  addFolder,
} from './actions'

export { FileList, FileListHeader } from './components'
export { getFileNameFromPath } from './functions'
export { reducer as filesReducer } from './reducer'
export { filesSaga } from './sagas'
