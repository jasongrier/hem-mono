export type MainMode =
    'arranger'
  | 'editor'
  | 'project'

export interface IState {
  mainMode: MainMode
  sidebarOpen: boolean
}
