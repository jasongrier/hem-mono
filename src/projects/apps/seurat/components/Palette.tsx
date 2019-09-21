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
      <XYControl color='white' />
      <XYControl color='red' />
      <XYControl color='yellow' />
      <XYControl color='blue' />
      <ColorPicker />
    </div>
  )
}

export default Palette
