import React, { ReactElement, useState } from 'react'
import { noop } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCanvas } from '../store/actions'
import { RootState } from '../store'
import { uiLocked as uiLockedSel } from '../store/selectors'
import IconButton from './IconButton'
import Dial from './Dial'

function MasterControls(): ReactElement {
  const { currentCanvasIndex, cursorGroup, uiLocked } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
    currentCanvasIndex: state.app.currentCanvasIndex,
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  // Keep fast, real time updates in local state
  const [logoAngle, setLogoAngle] = useState(currentCanvasIndex)

  return (
    <div className="main-controls">
      <div
        className={`main-controls__dial-logo main-controls__dial-logo--${cursorGroup}`}
        style={{
          transform: `rotate(${logoAngle * 360 - 180}deg)`,
        }}
      >
        <span>HEM</span>
      </div>
      <Dial
        className="main-controls__dial main-controls__dial--preset-selector"
        color="#d8d8d8" // TODO: Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
        onChange={(value) => {
          setLogoAngle(value)
        }}
        onChangeDone={(value) => {
          dispatch(setCurrentCanvas(value)) // TODO: `setCurrentCanvasIndex`
        }}
        onPress={noop}
        size={66}
        value={currentCanvasIndex}
      />

      <div className="main-controls__screen"></div>

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
