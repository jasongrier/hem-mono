import { AnyAction } from 'redux'

export interface IProject {
  title: string
  fullPath: string
}

export interface IState {
  currentProject: IProject | null
}

export const LOAD_PROJECT = 'LOAD_PROJECT'
export const NEW_PROJECT = 'NEW_PROJECT'
export const OPEN_PROJECT = 'OPEN_PROJECT'
export const SAVE_PROJECT = 'SAVE_PROJECT'

export interface ILoadProject extends AnyAction {
  type: typeof LOAD_PROJECT
  payload: IProject
}

export interface INewProject extends AnyAction {
  type: typeof NEW_PROJECT
  payload: null
}

export interface IOpenProject extends AnyAction {
  type: typeof OPEN_PROJECT
  payload: null
}

export interface ISaveProject extends AnyAction {
  type: typeof SAVE_PROJECT
  payload: IProject
}

export type Action =
  ILoadProject
  | INewProject
  | IOpenProject
  | ISaveProject

export {
  loadProject,
  newProject,
  openProject,
  saveProject,
} from './actions'

export { ProjectSplashScreen } from './components'
export { reducer as appReducer } from './reducer'
export { projectSaga } from './sagas'
