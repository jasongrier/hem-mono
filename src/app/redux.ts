import { IState, MainMode } from './types'

// ================================================================================
// Action types
// ================================================================================
const SET_MAIN_MODE = 'SET_MAIN_MODE'
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

interface ISetMainMode extends IAction {
  type: typeof SET_MAIN_MODE
  payload: MainMode
}

interface IToggleSidebar extends IAction {
  type: typeof TOGGLE_SIDEBAR
  payload: null
}

type ActionType =
  | ISetMainMode
  | IToggleSidebar

// ================================================================================
// Actions
// ================================================================================
const toggleSidebar = (): ActionType => ({
  type: TOGGLE_SIDEBAR,
  payload: null,
})

const setMainMode = (mainMode: MainMode): ActionType => ({
  type: SET_MAIN_MODE,
  payload: mainMode,
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
  toggleSidebar,
  setMainMode,

  initialState,

  reducer,
}
