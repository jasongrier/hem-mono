import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import ControlPanelButton from './ControlPanelButton'

interface IProps {
  className?: string
  type: string
}

function WebVersionSelectPresetButton({ className, type }: IProps): ReactElement {
  const dispatch = useDispatch()

  return (
    <ControlPanelButton
      className={
        (className ? className : '')
        + (webVersionBoardPreset === type ? ' selected' : '')
      }
      icon={type}
      onClick={() => dispatch(setWebVersionPreset(type))}
    />
  )
}

export default WebVersionSelectPresetButton
