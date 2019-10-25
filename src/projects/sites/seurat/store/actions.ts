import { AnyAction } from 'redux'
import { promisedTimeout } from '../../../../common/functions'
import {
  OPENING_SEQUENCE_BEGUN,
  OPENING_SEQUENCE_DONE,
  SET_CANVAS,
  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_DRAGGING,
  SET_ON,
  SET_PARAM,
  UPDATE_DOT,

  CursorGroup,
  CursorMode,
  ThunkResult,
} from './types'

const playOpeningSequence = (andTurnOn: boolean = false): ThunkResult<void> =>
  async dispatch => {
    dispatch({ type: OPENING_SEQUENCE_BEGUN, payload: null })

    if (andTurnOn) {
      dispatch({ type: SET_ON, payload: true })
    }

    dispatch({ type: SET_CURSOR_GROUP, payload: 'white' })
    await promisedTimeout(500)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'red' })
    await promisedTimeout(500)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'yellow' })
    await promisedTimeout(500)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'blue' })
    await promisedTimeout(500)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'white' })
    await promisedTimeout(500)

    dispatch({ type: OPENING_SEQUENCE_DONE, payload: null })
  }

const setCanvas = (canvasNumber: number): AnyAction => ({ // TODO: These should be their respective action types from `./types`!!! (All projects...)
  type: SET_CANVAS,
  payload: canvasNumber,
})

const setCursorGroup = (cursorGroup: CursorGroup): AnyAction => ({
  type: SET_CURSOR_GROUP,
  payload: cursorGroup,
})

const setCursorMode = (cursorMode: CursorMode): AnyAction => ({
  type: SET_CURSOR_MODE,
  payload: cursorMode,
})

const setDragging = (isDragging: boolean): AnyAction => ({
  type: SET_DRAGGING,
  payload: isDragging,
})

const setParam = ({ index, value }: { index: number, value: number }): AnyAction => ({
  type: SET_PARAM,
  payload: { index, value },
})

const setOn = (on: boolean): AnyAction => ({
  type: SET_ON,
  payload: on,
})

const updateDot = ({
  cursorGroup,
  dotNumber,
  sound,
}: {
  cursorGroup: CursorGroup,
  dotNumber: number,
  sound: string,
}): AnyAction => ({
  type: UPDATE_DOT,
  payload: { dotNumber, cursorGroup, sound },
})

export {
  playOpeningSequence,
  setCanvas,
  setCursorGroup,
  setCursorMode,
  setDragging,
  setOn,
  setParam,
  updateDot,
}
