import React, { ReactElement, useEffect } from 'react'
// import { setTempo } from '../../../../common/helpers'
import XYControl from './XYControl'
import ColorPicker from './ColorPicker'

function Palette(): ReactElement {
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('slower')
  //     setTempo(48)
  //   }, 5000)
  // }, [])

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
}

export default Palette
