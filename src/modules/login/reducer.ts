import { AnyAction } from 'redux'
import {
  LOG_IN,
  LOG_IN_CHECK_REQUEST,
  LOG_IN_CHECK_RESULT,
  LOG_IN_RESET_ERROR,
  LOG_OUT,

  IState,
} from './index'


const initialState: IState = {
  loggedIn: null,
  loginFailed: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case LOG_IN: {
      const success = (
        payload.email === 'info@hem.rocks'
        && payload.password === 'easyeasy'
      )
      return { ...state, loggedIn: success, loginFailed: !success }
    }

    case LOG_IN_CHECK_REQUEST: {
      return state
    }

    case LOG_IN_CHECK_RESULT: {
      return { ...state, loggedIn: payload }
    }

    case LOG_IN_RESET_ERROR: {
      return { ...state, loginFailed: false }
    }

    case LOG_OUT: {
      return { ...state, loggedIn: false, loginFailed: false }
    }

    default: {
      return state
    }
  }
}

export {
  initialState,
  reducer,
}
