import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import {
  FaEdit,
  FaLayerGroup,
  FaProjectDiagram,
  FaCaretSquareRight,
} from 'react-icons/fa'
import { MainMode } from '../types'
import { setMainMode, toggleSidebar } from '../redux'

interface IProps {
  mainMode: MainMode
}

function Header({ mainMode }: IProps): ReactElement {
  const dispatch = useDispatch() // TODO: Optimization issue: Click fast on these buttons and see...

  return (
    <div className="app-header">
      <div className="sidebar-toggle">
        <div
          className="icon-button active"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaCaretSquareRight />
        </div>
      </div>
      <div className="main-mode-selector">
        <div
          className={clsx('icon-button', mainMode === 'project' && 'active')}
          onClick={() => dispatch(setMainMode('project'))}
        >
          <FaProjectDiagram />
        </div>
        <div
          className={clsx('icon-button', mainMode === 'edit' && 'active')}
          onClick={() => dispatch(setMainMode('edit'))}
        >
          <FaEdit />
        </div>
        <div
          className={clsx('icon-button', mainMode === 'arrange' && 'active')}
          onClick={() => dispatch(setMainMode('arrange'))}
        >
          <FaLayerGroup />
        </div>
      </div>
    </div>
  )
}

export default Header
