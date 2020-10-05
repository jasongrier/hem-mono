import { AnyAction } from 'redux'
import {
  LOAD_PROJECT,
  NEW_PROJECT,
  OPEN_PROJECT,
  SAVE_PROJECT,

  IProject,
} from './index'

const loadProject = (project: IProject): AnyAction => ({
  type: NEW_PROJECT,
  payload: project,
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
  newProject,
  openProject,
  saveProject,
}
