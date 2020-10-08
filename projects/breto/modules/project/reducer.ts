import { AnyAction } from 'redux'
import produce from 'immer'
import {
  LOAD_PROJECT,
  RECENT_PROJECTS_LOAD,
  RECENT_PROJECTS_REQUEST,
  NEW_PROJECT,
  OPEN_PROJECT,
  SAVE_PROJECT,

  IState,
} from './index'

const initialState: IState = {
  currentProjectId: 'null',
  currentProjectTitle: null,
  fullPath: null,
  recentProjects: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case LOAD_PROJECT: {
      return produce(state, draftState => {
        draftState.currentProjectId = payload.id
        draftState.currentProjectTitle = payload.title
        draftState.fullPath = payload.fullPath
      })
    }

    case RECENT_PROJECTS_LOAD: {
      return produce(state, draftState => {
        draftState.recentProjects = payload
      })
    }

    case NEW_PROJECT:
    case OPEN_PROJECT:
    case RECENT_PROJECTS_REQUEST:
    case SAVE_PROJECT:
    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
