import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import {
  clearCanvas,
  playOpeningSequence,
  setCursorGroup,
  setCursorMode,
  setDeviceOn,
  setPlaying,
} from '../store/actions'
import { uiLocked as uiLockedSel } from '../store/selectors'
import IconButton from './IconButton'
import PressAndHoldButton from './PressAndHoldButton'

function DeviceControls(): ReactElement {
  const { activeDotsCount, cursorGroup, cursorMode, on, playing, uiLocked } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
    cursorMode: state.app.cursorMode,
    on: state.app.on,
    playing: state.app.playing,
    uiLocked: uiLockedSel(state),
    activeDotsCount: state.app.canvases[
      state.app.currentCanvasIndex
    ].dots.reduce((acc, dot) => dot.cursorGroup !== 'none' ? acc + 1 : acc, 0)
  }))

  const dispatch = useDispatch()

  return (
    <div className="device-controls">
        <div className="device-controls__top">
          <IconButton
            iconClassName={`icon-button__icon--${cursorGroup}`}
            selected={on}
            icon="on-off"
            onClick={() => {
              if (on && !uiLocked) {
                dispatch(setDeviceOn(false))
              }

              else {
                dispatch(playOpeningSequence(true))
              }
            }}
          />
          <IconButton
            hidden={uiLocked}
            icon="play"
            selected={playing}
            onClick={() => {
              if (uiLocked) return
              dispatch(setPlaying(!playing))
            }}
          />
          <PressAndHoldButton
            disabled={activeDotsCount === 0}
            hidden={uiLocked}
            selected={cursorGroup === 'none' && cursorMode === 'erase'}
            icon="clear-canvas"
            onClick={() => {
              if (uiLocked) return

              if (cursorGroup === 'none' && cursorMode === 'erase') {
                dispatch(setCursorGroup('a'))
                dispatch(setCursorMode('draw'))
              }

              else {
                dispatch(setCursorGroup('none'))
                dispatch(setCursorMode('erase'))
              }
            }}
            onHold={() => {
              if (uiLocked) return
              dispatch(clearCanvas())
            }}
          />
          <IconButton
            disabled={true}
            hidden={uiLocked}
            icon="undo"
            selected={false}
            onClick={() => {
              if (uiLocked) return
              // if (undoIndex < 1) return
              // dispatch(undo())
            }}
          />
          <IconButton
            disabled={true}
            hidden={uiLocked}
            icon="redo"
            selected={false}
            onClick={() => {
              if (uiLocked) return
              // if (undoIndex < undoStack.length) return
              // dispatch(redo())
            }}
          />
          <IconButton
            hidden={uiLocked}
            icon="connect"
            selected={false}
            onClick={() => {
              if (uiLocked) return
              // if (undoIndex < undoStack.length) return
              // dispatch(redo())
            }}
          />
        </div>
      </div>
  )
}

export default DeviceControls
