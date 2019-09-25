import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store' // TODO: Why is this not barrelized??
import { CursorGroup } from '../store/types' // TODO: Why is this not barrelized??
import { setCursorGroup } from '../store/actions' // TODO: Why is this not barrelized??
import XYControl from './XYControl'

interface IProps {
  color: CursorGroup
  sendVal: () => void
}

function ColorSettingXYControl({ color, sendVal }: IProps): ReactElement {
  const { cursorGroup } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
  }))

  const dispatch = useDispatch()

  const disabled = cursorGroup !== color

  return (
    <div className={`color-setting-xy-control ${disabled ? 'color-setting-xy-control--disabled' : ''}`}>
      <XYControl
        color={color}
        disabled={disabled}
        onDisabledClick={() => dispatch(setCursorGroup(color))}
        sendVal={sendVal}
      />
    </div>
  )
}

export default ColorSettingXYControl
