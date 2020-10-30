import { AnyAction } from 'redux'

export interface IState {

}

export const ADMIN_APPLY_FILTER = 'ADMIN_APPLY_FILTER'

export interface IAdminApplyFilter extends AnyAction {
  type: typeof ADMIN_APPLY_FILTER
  payload: string
}

export type Action = IAdminApplyFilter

// export { adminApplyFilter } from './actions'
export { } from './functions'
export { Midst } from './components'
export { reducer as contentReducer } from './reducer'
export { } from './sagas'
