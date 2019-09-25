import React, { ReactElement } from 'react'
// import { setTempo } from '../../../../common/helpers'
import ColorSettingXYControl from './ColorSettingXYControl'
import XYControl from './XYControl'
import ColorPicker from './ColorPicker'

const config = require('../config')

function Palette(): ReactElement {
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('slower')
  //     setTempo(48)
  //   }, 5000)
  // }, [])

  switch (config.VARIANTS.palletteType) {
    case 1:
      return (
        <div className="palette">
          <XYControl
            color='white'
            sendVal={() => {}}
          />
          <XYControl
            color='red'
            sendVal={() => {}}
          />
          <XYControl
            color='yellow'
            sendVal={() => {}}
          />
          <XYControl
            color='blue'
            sendVal={() => {}}
          />
          <div className="palette-boxes">
            <div className="palette-box">
              <ColorPicker />
            </div>
            <div className="palette-box">
            </div>
            <div className="palette-box">
            </div>
            <div className="palette-box">
            </div>
          </div>
        </div>
      )

    case 2:
      return (
        <div className="palette palette--two">
          <ColorSettingXYControl
            color='white'
            sendVal={() => {}}
          />
          <ColorSettingXYControl
            color='red'
            sendVal={() => {}}
          />
          <ColorSettingXYControl
            color='yellow'
            sendVal={() => {}}
          />
          <ColorSettingXYControl
            color='blue'
            sendVal={() => {}}
          />
        </div>
      )

    default:
      return <div />
  }
}

export default Palette
