import React, { ReactElement } from 'react'
import ControlPanelButton from './ControlPanelButton'
import WebVersionSelectPresetButton from './WebVersionSelectPresetButton'
import { setWebVersionPreset } from '../store/actions'

function ControlPanel(): ReactElement {
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
          icon="foo"
          onClick={() => console.log('worked')}
        />
      </div>
    </div>
  )
}

export default ControlPanel
