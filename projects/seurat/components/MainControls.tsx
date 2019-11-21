import React, { ReactElement, useState, useEffect } from 'react'
import { noop } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCanvas, setPlaying } from '../store/actions'
import { RootState } from '../store'
import { uiLocked as uiLockedSel } from '../store/selectors'
import IconButton from './IconButton'
import LcdScreen from './LcdScreen'
import Dial from './Dial'

let currentCanvasIndexProxy: number

function MasterControls(): ReactElement {
  const { currentCanvasIndex, currentCanvasName, cursorGroup, maxCanvasIndex, playing, uiLocked } = useSelector((state: RootState) => ({
    currentCanvasIndex: state.app.currentCanvasIndex,
    currentCanvasName: state.app.canvases[state.app.currentCanvasIndex].name, // TODO: Current canvas selector
    cursorGroup: state.app.cursorGroup,
    maxCanvasIndex: state.app.canvases.length - 1,
    playing: state.app.playing,
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  function advancePresetFromArrowKeys(evt: any) {
    if (evt.keyCode === 38 && currentCanvasIndexProxy < maxCanvasIndex) {
      dispatch(setCurrentCanvas(currentCanvasIndexProxy + 1))
      setRealCanvasIndexDialValue((currentCanvasIndexProxy + 1) / 99)
    }

    else if (evt.keyCode === 40 && currentCanvasIndexProxy > 0) {
      dispatch(setCurrentCanvas(currentCanvasIndexProxy - 1))
      setRealCanvasIndexDialValue((currentCanvasIndexProxy - 1) / 99)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', advancePresetFromArrowKeys)
    return function destroy() {
      document.removeEventListener('keydown', advancePresetFromArrowKeys)
    }
  }, [])

  useEffect(() => {
    currentCanvasIndexProxy = currentCanvasIndex
  }, [currentCanvasIndex])

  // Keep fast, real time updates in local state
  const [realCanvasIndexDialValue, setRealCanvasIndexDialValue] = useState(currentCanvasIndex)

  return (
    <div className="main-controls">
      <div
        className={`main-controls__dial-logo main-controls__dial-logo--${cursorGroup}`}
        style={{
          transform: `rotate(${realCanvasIndexDialValue * 360}deg)`,
        }}
      >
        <span>HEM</span>
      </div>
      <Dial
        className="main-controls__dial main-controls__dial--preset-selector"
        color="#d8d8d8" // TODO: Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
        onChange={(value) => {
          dispatch(setCurrentCanvas(Math.floor(value * 99)))
          setRealCanvasIndexDialValue(value)
        }}
        onChangeDone={noop} // TODO: Should not be required
        onPress={noop}
        size={79}
        value={1}
      />


      <div className="main-controls__cue-control">
        <div className="main-controls__screen">
          <LcdScreen content={currentCanvasName} />
        </div>

        <IconButton
          className="icon-button--play"
          hidden={uiLocked}
          icon="play"
          selected={playing}
          onClick={() => {
            if (uiLocked) return
            dispatch(setPlaying(!playing))
          }}
        />

        <IconButton
          className="icon-button--cue"
          hidden={uiLocked}
          icon="cue"
          selected={false}
          onClick={() => {
            // if (uiLocked) return
            // dispatch(setCueMode(!cueMode))
          }}
        />
      </div>
    </div>
  )
}

export default MasterControls
