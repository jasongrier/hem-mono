import React, { ReactElement, useState, useEffect } from 'react'
import { noop } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCanvas } from '../store/actions'
import { RootState } from '../store'
import { uiLocked as uiLockedSel } from '../store/selectors'
import IconButton from './IconButton'
import LcdScreen from './LcdScreen'
import Dial from './Dial'

let currentCanvasIndexProxy: number

function MasterControls(): ReactElement {
  const { currentCanvasIndex, currentCanvasName, cursorGroup, maxCanvasIndex, uiLocked } = useSelector((state: RootState) => ({
    currentCanvasIndex: state.app.currentCanvasIndex,
    currentCanvasName: state.app.canvases[state.app.currentCanvasIndex].name, // TODO: Current canvas selector
    cursorGroup: state.app.cursorGroup,
    maxCanvasIndex: state.app.canvases.length - 1,
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
        size={66}
        value={realCanvasIndexDialValue}
      />


      <div className="main-controls__screen">
        <LcdScreen content={currentCanvasName} />
      </div>

      {/* <Dial
        className="main-controls__dial main-controls__dial--foo"
        color="#d8d8d8" // TODO: Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
        onChange={noop} // TODO: Set in real time directly on the audio API
        onChangeDone={noop}
        onPress={noop}
        size={36}
        value={0.5}
      />
      <Dial
        className="main-controls__dial main-controls__dial--bank-selector"
        color="#d8d8d8" // TODO: Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
        onChange={noop} // TODO: Set in real time directly on the audio API
        onChangeDone={noop}
        onPress={noop}
        size={36}
        value={0.5}
      /> */}

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
  )
}

export default MasterControls
