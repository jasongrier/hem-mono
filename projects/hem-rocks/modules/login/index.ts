import { AnyAction } from 'redux'

export interface IState {
  loggedIn: boolean | null
  loginFailed: boolean | null
}

export const LOG_IN_CHECK_REQUEST = 'LOG_IN_CHECK_REQUEST'
export const LOG_IN_CHECK_RESULT = 'LOG_IN_CHECK_RESULT'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN_RESET_ERROR = 'LOG_IN_RESET_ERROR'

export interface ILogIn extends AnyAction {
  type: typeof LOG_IN
  payload: { email: string, password: string }
}

export interface ILogInCheckRequest extends AnyAction {
  type: typeof LOG_IN_CHECK_REQUEST
  payload: boolean
}

export interface ILogInCheckResult extends AnyAction {
  type: typeof LOG_IN_CHECK_RESULT
  payload: boolean
}

export interface ILogInResetError extends AnyAction {
  type: typeof LOG_IN_RESET_ERROR
  payload: null
}

export interface ILogOut extends AnyAction {
  type: typeof LOG_OUT
  payload: null
}

export type Action =
  ILogIn
  | ILogInCheckRequest
  | ILogInCheckResult
  | ILogInResetError
  | ILogOut

export { logIn, logInCheckRequest, logInResetError, logOut } from './actions'
export { loginCheckSaga, loginSaga, logoutSaga } from './sagas'
export { reducer } from './reducer'
