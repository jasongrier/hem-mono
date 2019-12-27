import { AnyAction } from 'redux'
import {
  SET_STUCK_PENCIL,
  SET_STUCK_PLAYER,

  IState,
} from './index'

const initialState: IState = {
  stuckPencil: false,
  stuckPlayer: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_STUCK_PENCIL: {
      return { ...state, stuckPencil: payload }
    }

    case SET_STUCK_PLAYER: {
      return { ...state, stuckPlayer: payload }
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
