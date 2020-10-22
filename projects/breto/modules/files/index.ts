import { AnyAction } from 'redux'

export interface IFile {
  lastModifiedDate: Date
  name: string,
  size: number
  title: string,
  type: string
  webkitRelativePath: string
}

export interface IState {
  files: IFile[]
}

export const ADD_FILE = 'ADD_FILE'

export interface IAddFile extends AnyAction {
  type: typeof ADD_FILE
  payload: any[]
}

export type Action = IAddFile

export {
  addFile,
} from './actions'

export { FileList, FileListHeader } from './components'
export { getFileNameFromPath } from './functions'
export { reducer as filesReducer } from './reducer'
export { filesSaga } from './sagas'
