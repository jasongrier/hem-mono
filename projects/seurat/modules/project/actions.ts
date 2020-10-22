import { AnyAction } from 'redux'
import {
  LOAD_PROJECT,
  RECENT_PROJECTS_LOAD,
  RECENT_PROJECTS_REQUEST,
  NEW_PROJECT,
  OPEN_PROJECT,
  SAVE_PROJECT,

  IProject,
} from './index'

const loadProject = (project: IProject): AnyAction => ({
  type: LOAD_PROJECT,
  payload: project,
})

const recentProjectsLoad = (projects: Partial<IProject>): AnyAction => ({
  type: RECENT_PROJECTS_LOAD,
  payload: projects,
})

const recentProjectsRequest = (): AnyAction => ({
  type: RECENT_PROJECTS_REQUEST,
  payload: null,
})

const newProject = (): AnyAction => ({
  type: NEW_PROJECT,
  payload: null,
})

const openProject = (): AnyAction => ({
  type: OPEN_PROJECT,
  payload: null,
})

const saveProject = (project: IProject): AnyAction => ({
  type: SAVE_PROJECT,
  payload: project,
})

export {
  loadProject,
  recentProjectsLoad,
  recentProjectsRequest,
  newProject,
  openProject,
  saveProject,
}
