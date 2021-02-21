import {
  LOG_IN,
  LOG_IN_CHECK_REQUEST,
  LOG_IN_CHECK_RESULT,
  LOG_IN_RESET_ERROR,
  LOG_OUT,

  Action,
} from './index'

// TODO: Use the appropriate matching action types
const logIn = (email: string, password: string): Action => ({
  type: LOG_IN,
  payload: { email, password },
})

const logInCheckRequest = (): Action => ({
  type: LOG_IN_CHECK_REQUEST,
  payload: null,
})

const logInCheckResult = (loggedIn: boolean): Action => ({
  type: LOG_IN_CHECK_RESULT,
  payload: loggedIn,
})

const logInResetError = (): Action => ({
  type: LOG_IN_RESET_ERROR,
  payload: null,
})

const logOut = (): Action => ({
  type: LOG_OUT,
  payload: null,
})

export {
  logIn,
  logInCheckRequest,
  logInCheckResult,
  logInResetError,
  logOut,
}
