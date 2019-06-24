export type MainMode =
    'arrange'
  | 'edit'
  | 'project'

export interface IState {
  mainMode: MainMode
  sidebarOpen: boolean
}

export const SET_MAIN_MODE = 'SET_MAIN_MODE'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export interface ISetMainMode extends IAction {
  type: typeof SET_MAIN_MODE
  payload: MainMode
}

export interface IToggleSidebar extends IAction {
  type: typeof TOGGLE_SIDEBAR
  payload: null
}

export type Action =
    ISetMainMode
  | IToggleSidebar
