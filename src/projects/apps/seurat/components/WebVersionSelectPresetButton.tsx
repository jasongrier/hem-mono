import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setCanvas } from '../store/actions'
import ControlPanelButton from './ControlPanelButton'

interface IProps {
  className?: string
  type: string
}

const activeClassMap = [
  'amp',
  'bells',
  'drum',
  'guitars',
  'piano',
  'sax',
  'turntable',
]

function WebVersionSelectPresetButton({ className, type }: IProps): ReactElement {
  const { currentCanvas } = useSelector((state: RootState) => ({
    currentCanvas: state.app.currentCanvas,
  }))

  const dispatch = useDispatch()

  return (
    <ControlPanelButton
      className={
        (className ? className : '')
        + (activeClassMap[currentCanvas] === type ? ' selected' : '')
      }
      icon={type}
      onClick={() => dispatch((setCanvas(activeClassMap.indexOf(type))))}
    />
  )
}

export default WebVersionSelectPresetButton
