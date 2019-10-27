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
  SET_MASTER_VOLUME,
  SET_PLAYING,
  UNDO,
  UPDATE_CONTROL,
  UPDATE_DOT,

  ControlName,
  CursorGroup,
  CursorMode,
  SequencerMode,
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

    dispatch({ type: SET_CURSOR_GROUP, payload: 'a' })
    await promisedTimeout(450)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'b' })
    await promisedTimeout(450)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'c' })
    await promisedTimeout(450)

    dispatch({ type: SET_CURSOR_GROUP, payload: 'a' })
    await promisedTimeout(450)
  }

const redo = (): AnyAction => ({
  type: REDO,
  payload: null,
})

const setCurrentCanvas = (canvasNumber: number): AnyAction => ({ // TODO: These should be their respective action types from `./types`!!! (All projects...)
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

const setDeviceOn = (on: boolean): AnyAction => ({
  type: SET_DEVICE_ON,
  payload: on,
})

const setDragging = (isDragging: boolean): AnyAction => ({
  type: SET_DRAGGING,
  payload: isDragging,
})

const setMasterVolume = (masterVolume: number): AnyAction => ({
  type: SET_MASTER_VOLUME,
  payload: masterVolume,
})

const setPlaying = (playing: boolean): AnyAction => ({
  type: SET_PLAYING,
  payload: playing,
})

const undo = (): AnyAction => ({
  type: UNDO,
  payload: null,
})

const updateControl = (cursorGroup: CursorGroup, key: ControlName, value: SequencerMode | number | boolean): AnyAction => ({
  type: UPDATE_CONTROL,
  payload: { cursorGroup, key, value },
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
  setCurrentCanvas,
  setCursorGroup,
  setCursorMode,
  setDragging,
  setMasterVolume,
  setDeviceOn,
  setPlaying,
  undo,
  updateControl,
  updateDot,
}
