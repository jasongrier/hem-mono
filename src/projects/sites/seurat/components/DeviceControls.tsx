import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { toggleOn } from '../store/actions'
import IconButton from './IconButton'

/**
 * Buttons
 * – Top
 * –– Power on/off
 *
 * – Bottom
 * –– Clear canvas
 */

function DeviceControls(): ReactElement {
  const { on } = useSelector((state: RootState) => ({
    on: state.app.on,
  }))

  const dispatch = useDispatch()

  return (
    <div className="device-controls">
        <div className="device-controls__top">
          <IconButton
            selected={on}
            icon="on-off"
            onClick={() => dispatch(toggleOn())}
          />
          {/* <h2 className="vendor-credit">by HEM<sup>TM</sup></h2> */}
        </div>
        <div className="device-controls__bottom">
          <div className="instrument-logo">
            <h1>
              <span>Seurat</span>
            </h1>
          </div>
        </div>
      </div>
  )
}

export default DeviceControls
