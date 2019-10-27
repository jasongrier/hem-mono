import React, { ReactElement } from 'react'
import { noop } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setMasterVolume } from '../store/actions'
import { RootState } from '../store'
import Dial from './Dial'

function MasterControls(): ReactElement {
  const { cursorGroup, masterVolume } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
    masterVolume: state.app.masterVolume,
  }))

  const dispatch = useDispatch()

  return (
    <div className="main-controls">
      <div
        className={`main-controls__dial-logo main-controls__dial-logo--${cursorGroup}`}
        style={{
          transform: `rotate(${masterVolume * 360 - 180}deg)`,
        }}
      >
        HEM
      </div>
      <Dial
        className="main-controls__dial main-controls__dial--main-volume"
        color="#d8d8d8" // TODO: Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
        onChange={(value) => {
          dispatch(setMasterVolume(value))
        }}
        onChangeDone={(value) => {
          dispatch(setMasterVolume(value))
        }}
        onPress={noop}
        size={66}
        value={masterVolume}
      />

      <div className="main-controls__screen"></div>

      <Dial
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
      />
    </div>
  )
}

export default MasterControls
