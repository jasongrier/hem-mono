import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { playOpeningSequence, setOn } from '../store/actions'
import { uiLocked as uiLockedSel } from '../store/selectors'
import IconButton from './IconButton'
import InstrumentLogo from './InstrumentLogo'

/**
 * Buttons
 * – Top
 * –– Power on/off
 * –– Play
 * –– Stop
 * –– Clear (press and hold, flashes red for 5 seconds, clears canvas)
 *
 * – Bottom
 * –– Clear canvas
 */

function DeviceControls(): ReactElement {
  const { on, uiLocked } = useSelector((state: RootState) => ({
    on: state.app.on,
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  return (
    <div className="device-controls">
        <div className="device-controls__top">
          <IconButton
            selected={on}
            icon="on-off"
            onClick={() => {
              if (on && !uiLocked) {
                dispatch(setOn(false))
              }

              else {
                dispatch(playOpeningSequence(true))
              }
            }}
          />
        </div>
        <div className="device-controls__bottom">
          <InstrumentLogo />
        </div>
      </div>
  )
}

export default DeviceControls
