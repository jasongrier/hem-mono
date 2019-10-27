import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { setCursorGroup, updateControl } from '../store/actions'
import { ControlName, CursorGroup, SequencerMode } from '../store/types'
import Dial from './Dial'

interface IProps {
  cursorGroup: CursorGroup
  label: string
  name: ControlName
  disabled: boolean
  value: number
}

function SeuratDial({ cursorGroup, label, name, disabled, value }: IProps): ReactElement {
  const dispatch = useDispatch()

  return (
    <div className={`seurat-dial ${disabled ? 'seurat-dial--disabled' : ''}`}>
      <div className="seurat-dial__label">
        {label}
      </div>
      <Dial // TODO: values in these handlers are frozen by some DOM event handler stuff in Nexus
        onChange={() => {
          // TODO: Immediately alter playback
        }}
        onChangeDone={(finalValue) => {
          dispatch(updateControl(cursorGroup, name, finalValue))
        }}
        onPress={() => {
          dispatch(setCursorGroup(cursorGroup))
        }}
        value={value}
      />
    </div>
  )
}

export default SeuratDial
