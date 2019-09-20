import React, { ReactElement, useEffect } from 'react'
// import { setTempo } from '../../../../common/helpers'
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
      <ColorPicker />
    </div>
  )
}

export default Palette
