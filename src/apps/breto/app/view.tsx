import React, { ReactElement } from 'react'
import clsx from 'clsx'
import { Header } from './header'
import { Edit } from '../edit'
import { Sidebar } from '../sidebar'
import { MainMode } from './types'
import './style.css'

interface IProps {
  mainMode: MainMode
  mainWidth: number
  sidebarOpen: boolean
}

function AppView({ mainMode, mainWidth, sidebarOpen }: IProps): ReactElement {
  return (
		<div className={clsx('app', sidebarOpen && 'has-sidebar')}>
      <Header mainMode={mainMode} />
      <Sidebar />
      <div className="main">
        {mainMode === 'project' && (
          <div className="project">PROJECT</div>
        )}
        {mainMode === 'edit' && (
          <Edit mainWidth={mainWidth} />
        )}
        {mainMode === 'arrange' && (
          <div className="arrange">ARRANGE</div>
        )}
      </div>
    </div>
	)
}

export default AppView
