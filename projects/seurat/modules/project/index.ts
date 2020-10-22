import { AnyAction } from 'redux'

export interface IClip {
  file: number
  id: string
  name: string
  startTime: number
  endTime: number
  tags: string
}

export interface IAttachment {
  file: string
  type: string // image, score, video
}

export interface ISection {
  id: string
  parentId: string | null
  name: string
  clipId: string
  description: string
  tags: string
}

export interface IProject {
  clips: IClip[]
  files: string[]
  fullPath: string
  id: string
  sections: ISection[]
  title: string
}

export interface IState {
  currentProjectId: string | null
  currentProjectTitle: string | null
  fullPath: string | null
  recentProjects: Partial<IProject>[]
}

export const LOAD_PROJECT = 'LOAD_PROJECT'
export const LOAD_RECENT_PROJECTS = 'LOAD_RECENT_PROJECTS'
export const RECENT_PROJECTS_LOAD = 'RECENT_PROJECTS_LOAD'
export const RECENT_PROJECTS_REQUEST = 'RECENT_PROJECTS_REQUEST'
export const NEW_PROJECT = 'NEW_PROJECT'
export const OPEN_PROJECT = 'OPEN_PROJECT'
export const SAVE_PROJECT = 'SAVE_PROJECT'

export interface ILoadProject extends AnyAction {
  type: typeof LOAD_PROJECT
  payload: IProject
}

export interface IRecentProjectsLoad extends AnyAction {
  type: typeof RECENT_PROJECTS_LOAD
  payload: Partial<IProject>[]
}

export interface IRecentProjectsRequest extends AnyAction {
  type: typeof RECENT_PROJECTS_REQUEST
  payload: null
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
  payload: null
}

export type Action =
  ILoadProject
  | IRecentProjectsLoad
  | IRecentProjectsRequest
  | INewProject
  | IOpenProject
  | ISaveProject

export {
  loadProject,
  recentProjectsLoad,
  recentProjectsRequest,
  newProject,
  openProject,
  saveProject,
} from './actions'

export { ProjectScreen, ProjectSplashScreen } from './components'
export { addToRecentProjects, createProject } from './functions'
export { reducer as projectReducer } from './reducer'
export { projectSaga } from './sagas'
