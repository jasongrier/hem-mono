import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ControlPanelButton from './ControlPanelButton'
import WebVersionSelectPresetButton from './WebVersionSelectPresetButton'
import { toggleOn } from '../store/actions'
import { RootState } from '../store'

function ControlPanel(): ReactElement {
  const { on } = useSelector((state: RootState) => ({
    on: state.app.on,
  }))

  const dispatch = useDispatch()

  return (
    <div className="control-panel">
      <div className="buttons-left">
        <WebVersionSelectPresetButton type="amp" />
        <WebVersionSelectPresetButton type="sax" />
        <WebVersionSelectPresetButton type="turntable" />
        <WebVersionSelectPresetButton type="drum" />
        <WebVersionSelectPresetButton type="bells" />
        <WebVersionSelectPresetButton type="piano" />
        <WebVersionSelectPresetButton type="guitars" />
      </div>
      <div className="buttons-right">
        <ControlPanelButton
          className={on ? 'selected' : ''}
          icon="on-off"
          onClick={() => dispatch(toggleOn())}
        />
      </div>
    </div>
  )
}

export default ControlPanel
