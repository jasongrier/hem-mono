import { AnyAction } from 'redux'
import { promisedTimeout } from '../../../../common/functions'
import { flashDot } from '../functions/canvas'
import {
  CLEAR_CANVAS,
  OPENING_SEQUENCE_BEGUN,
  OPENING_SEQUENCE_DONE,
  REDO,
  SET_CURRENT_CANVAS,
  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_DEVICE_ON,
  SET_DRAGGING,
  SET_PARAM,
  SET_PLAYING,
  UNDO,
  UPDATE_DOT,

  CursorGroup,
  CursorMode,
  ThunkResult,
} from './types'

const clearCanvas = (): AnyAction => ({
  type: CLEAR_CANVAS,
  payload: null,
})

const playOpeningSequence = (andTurnOn: boolean = false): ThunkResult<void> =>
  async (dispatch, getState) => {
    async function flashNextDot(index: number) {
      const { canvases, currentCanvasIndex, cursorGroup } = (getState() as any).app
      const totalDots = canvases[currentCanvasIndex].dots.length

      flashDot(index, ['dot--group-forced', `dot--group-forced-${cursorGroup}`])

      if (index < totalDots - 1) {
        await promisedTimeout(28)
        flashNextDot(index + 1)
      }

      else {
        dispatch({ type: OPENING_SEQUENCE_DONE, payload: null })
      }
    }

    flashNextDot(0)

    dispatch({ type: OPENING_SEQUENCE_BEGUN, payload: null })

    if (andTurnOn) {
      dispatch({ type: SET_DEVICE_ON, payload: true })
    }

    dispatch({ type: SET_CURSOR_GROUP, payload: 'white' })
    await promisedTimeout(350)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'red' })
    await promisedTimeout(350)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'yellow' })
    await promisedTimeout(350)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'blue' })
    await promisedTimeout(350)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'white' })
    await promisedTimeout(350)
  }

const redo = (): AnyAction => ({
  type: REDO,
  payload: null,
})

const setCanvas = (canvasNumber: number): AnyAction => ({ // TODO: These should be their respective action types from `./types`!!! (All projects...)
  type: SET_CURRENT_CANVAS,
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

const setPlaying = (playing: boolean): AnyAction => ({
  type: SET_PLAYING,
  payload: playing,
})

const setOn = (on: boolean): AnyAction => ({
  type: SET_DEVICE_ON,
  payload: on,
})

const undo = (): AnyAction => ({
  type: UNDO,
  payload: null,
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
  clearCanvas,
  playOpeningSequence,
  redo,
  setCanvas,
  setCursorGroup,
  setCursorMode,
  setDragging,
  setOn,
  setParam,
  setPlaying,
  undo,
  updateDot,
}
