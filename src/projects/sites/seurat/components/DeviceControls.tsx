import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { playOpeningSequence, setOn, setPlaying } from '../store/actions'
import { uiLocked as uiLockedSel } from '../store/selectors'
import IconButton from './IconButton'
import InstrumentLogo from './InstrumentLogo'

/**
 * Buttons
 * – Top
 * –– Power on/off [on-off.png]
 * –– Play [play.png]
 * –– Stop [stop.png]
 * –– Clear (press and hold, flashes red for 5 seconds, clears canvas) [clear-canvas.png]
 * –– Sound assignments [sound-assignments.png]
 */

function DeviceControls(): ReactElement {
  const { cursorGroup, on, playing, uiLocked } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
    on: state.app.on,
    playing: state.app.playing,
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  return (
    <div className="device-controls">
        <div className="device-controls__top">
          <IconButton
            iconClassName={`icon-button__icon--${cursorGroup}`}
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
          <IconButton
            className={`${uiLocked ? 'icon-button--hidden' : ''}`}
            selected={playing}
            icon="play"
            onClick={() => {
              if (uiLocked) return
              dispatch(setPlaying(true))
            }}
          />
          <IconButton
            className={`${uiLocked ? 'icon-button--hidden' : ''}`}
            selected={false}
            icon="stop"
            onClick={() => {
              dispatch(setPlaying(false))
            }}
          />
          <IconButton
            className={`${uiLocked ? 'icon-button--hidden' : ''}`}
            selected={false}
            icon="clear-canvas"
            onClick={() => {}}
          />
          <IconButton
            className={`${uiLocked ? 'icon-button--hidden' : ''}`}
            selected={false}
            icon="sound-assignments"
            onClick={() => {}}
          />
        </div>
        <div className="device-controls__bottom">
          <InstrumentLogo />
        </div>
      </div>
  )
}

export default DeviceControls
