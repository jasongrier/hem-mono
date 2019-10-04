import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store' // TODO: Why is this not barrelized??
import ColorSettingXYControl from './ColorSettingXYControl'
import { XYControl } from '../../../../common/components'
import ColorPicker from './ColorPicker'

const config = require('../config')

function Palette(): ReactElement {
  const { params } = useSelector((state: RootState) => ({
    params: state.app.params,
  }))

  const dispatch = useDispatch()

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
            sendVal={() => {}}
            x={params[0]}
            y={params[1]}
          />
          <XYControl
            sendVal={() => {}}
            x={params[2]}
            y={params[3]}
          />
          <XYControl
            sendVal={() => {}}
            x={params[4]}
            y={params[5]}
          />
          <XYControl
            sendVal={() => {}}
            x={params[6]}
            y={params[7]}
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
            xIndex={0}
          />
          <ColorSettingXYControl
            color='red'
            xIndex={2}
          />
          <ColorSettingXYControl
            color='yellow'
            xIndex={4}
          />
          <ColorSettingXYControl
            color='blue'
            xIndex={6}
          />
        </div>
      )

    default:
      return <div />
  }
}

export default Palette
