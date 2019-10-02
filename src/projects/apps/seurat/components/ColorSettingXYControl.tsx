import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store' // TODO: Why is this not barrelized??
import { CursorGroup } from '../store/types' // TODO: Why is this not barrelized??
import { setCursorGroup, setParam } from '../store/actions' // TODO: Why is this not barrelized??
import XYControl, { IVal } from './XYControl'

interface IProps {
  color: CursorGroup
  xIndex: number
}

function ColorSettingXYControl({ color, xIndex }: IProps): ReactElement {
  const { cursorGroup, params } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
    params: state.app.params,
  }))

  const dispatch = useDispatch()

  const disabled = cursorGroup !== color

  return (
    <div className={`color-setting-xy-control ${disabled ? 'color-setting-xy-control--disabled' : ''}`}>
      <XYControl
        color={color}
        disabled={disabled}
        onDisabledClick={() => dispatch(setCursorGroup(color))}
        sendVal={({x, y}: IVal) => {
          dispatch(setParam({ index: xIndex, value: x }))
          dispatch(setParam({ index: xIndex + 1, value: y }))
        }}
        x={params[xIndex]}
        y={params[xIndex + 1]}
      />
    </div>
  )
}

export default ColorSettingXYControl
