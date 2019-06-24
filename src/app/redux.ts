import {
  SET_MAIN_MODE,
  TOGGLE_SIDEBAR,

  Action,
  MainMode,

  IState,
} from './types'

// ================================================================================
// Actions
// ================================================================================
const setMainMode = (mainMode: MainMode): Action => ({
  type: SET_MAIN_MODE,
  payload: mainMode,
})

const toggleSidebar = (): Action => ({
  type: TOGGLE_SIDEBAR,
  payload: null,
})

// ================================================================================
// Reducer
// ================================================================================
const initialState: IState = {
  mainMode: 'project',
  sidebarOpen: false,
}

const reducer = (
  state: IState = initialState,
  {type, payload}: IAction,
): IState => {
  switch (type) {
    case SET_MAIN_MODE:
      return { ...state, mainMode: payload }

    case TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen }

    default:
      return state
  }
}

export {
  setMainMode,
  toggleSidebar,

  initialState,

  reducer,
}
