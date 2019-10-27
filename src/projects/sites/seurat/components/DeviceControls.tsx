import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import {
  clearCanvas,
  playOpeningSequence,
  setCueMode,
  setCursorGroup,
  setCursorMode,
  setDeviceOn,
  setPlaying,
} from '../store/actions'
import { uiLocked as uiLockedSel } from '../store/selectors'
import IconButton from './IconButton'
import InstrumentLogo from './InstrumentLogo'
import PressAndHoldButton from './PressAndHoldButton'

function DeviceControls(): ReactElement { // TODO: Rename to "SideButtons" or sth
  const { activeDotsCount, cueMode, cursorGroup, cursorMode, on, playing, uiLocked } = useSelector((state: RootState) => ({
    activeDotsCount: state.app.canvases[ // TODO: Make into a selector
      state.app.currentCanvasIndex
    ].dots.reduce((acc, dot) => dot.cursorGroup !== 'none' ? acc + 1 : acc, 0),
    cueMode: state.app.cueMode,
    cursorGroup: state.app.cursorGroup,
    cursorMode: state.app.cursorMode,
    on: state.app.on,
    playing: state.app.playing,
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    if (activeDotsCount < 1) {
      dispatch(setCursorGroup('a'))
      dispatch(setCursorMode('draw'))
    }
  }, [activeDotsCount])

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
        <IconButton
          hidden={uiLocked}
          icon="cue"
          selected={cueMode}
          onClick={() => {
            if (uiLocked) return
            dispatch(setCueMode(!cueMode))
          }}
        />
        <div className="device-controls__divider" />
        <IconButton
          className={`icon-button--select-color-${cursorGroup}`}
          hidden={uiLocked}
          icon="select-color"
          selected={cueMode}
          onClick={() => {
            if (uiLocked) return
            let nextCursorGroup
            switch (cursorGroup) {
              case 'none':
                nextCursorGroup = 'a'
                break
              case 'a':
                nextCursorGroup = 'b'
                break
              case 'b':
                nextCursorGroup = 'c'
                break
              case 'c':
                nextCursorGroup = 'a'
                break
            }
            dispatch(setCursorMode('draw'))
            dispatch(setCursorGroup(nextCursorGroup))
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
      </div>
      <div className="device-controls__bottom">
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
