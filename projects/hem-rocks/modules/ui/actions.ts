import {
  SET_STUCK_PENCIL,
  SET_STUCK_PLAYER,

  Action,
} from './index'


const setStuckPencil = (stuck: boolean): Action => ({
  type: SET_STUCK_PENCIL,
  payload: stuck,
})

const setStuckPlayer = (stuck: boolean): Action => ({
  type: SET_STUCK_PLAYER,
  payload: stuck,
})

export {
  setStuckPencil,
  setStuckPlayer,
}
