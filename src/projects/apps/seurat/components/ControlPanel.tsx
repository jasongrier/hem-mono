import React, { ReactElement } from 'react'
import ControlPanelButton from './ControlPanelButton'
import WebVersionSelectPresetButton from './WebVersionSelectPresetButton'
import { setWebVersionPreset } from '../store/actions'

function ControlPanel(): ReactElement {
  return (
    <div className="control-panel">
      <WebVersionSelectPresetButton type="amp" />
      <WebVersionSelectPresetButton type="sax" />
      <WebVersionSelectPresetButton type="turntable" />
      <WebVersionSelectPresetButton type="drum" />
      <WebVersionSelectPresetButton type="bells" />
      <WebVersionSelectPresetButton type="piano" />
      <WebVersionSelectPresetButton
        className="spacer--1"
        type="guitars"
      />
      <ControlPanelButton
        icon='foo'
        onClick={() => console.log('worked')}
      />
      <ControlPanelButton
        className='spacer--2'
        icon='foo'
        onClick={() => console.log('worked')}
      />
      <ControlPanelButton
        icon='foo'
        onClick={() => console.log('worked')}
      />
      <ControlPanelButton
        icon='foo'
        onClick={() => console.log('worked')}
      />
      <ControlPanelButton
        icon='foo'
        onClick={() => console.log('worked')}
      />
    </div>
  )
}

export default ControlPanel
