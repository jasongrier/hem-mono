import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { setCursorGroup, updateControl } from '../store/actions'
import { ControlName, CursorGroup, SequencerMode } from '../store/types'
import Dial from './Dial'

interface IProps {
  cursorGroup: CursorGroup
  name: ControlName
  uiLocked: boolean
  value: number
}

function SeuratDial({ cursorGroup, name, uiLocked, value }: IProps): ReactElement {
  const dispatch = useDispatch()

  return (
    <Dial
      onPress={() => {
        if (uiLocked) return
        dispatch(setCursorGroup(cursorGroup))
      }}
      onChange={() => {
        if (uiLocked) return
        // TODO: Immediately alter playback
      }}
      onChangeDone={(finalValue) => {
        if (uiLocked) return
        dispatch(updateControl(cursorGroup, name, finalValue))
      }}
      value={value}
    />
  )
}

export default SeuratDial
