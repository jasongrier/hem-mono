import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { WebVersionPreset } from '../store/types'
import ControlPanelButton from './ControlPanelButton'
import { setWebVersionPreset } from '../store/actions'

interface IProps {
  className?: string
  type: WebVersionPreset
}

function WebVersionSelectPresetButton({ className, type }: IProps): ReactElement {
  const { webVersionBoardPreset } = useSelector((state: RootState) => ({
    webVersionBoardPreset: state.app.webVersionBoardPreset,
  }))

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
