import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import {
  FaEdit,
  FaLayerGroup,
  FaProjectDiagram,
  FaCaretSquareRight,
} from 'react-icons/fa'
import { Waveform } from '../waveform'
import { setMainMode, toggleSidebar } from './redux'
import { MainMode } from './types'
import './style.css'

interface IProps {
  mainMode: MainMode
  mainWidth: number
  sidebarOpen: boolean
}

function AppView({ mainMode, mainWidth, sidebarOpen }: IProps): ReactElement {
  const dispatch = useDispatch()

  return (
		<div className={clsx('app', sidebarOpen && 'has-sidebar')}>
		  <div className="app-header">
        <div className="sidebar-toggle">
          <div
            className="icon-button active"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaCaretSquareRight />
          </div>
        </div>
        <div className="main-mode-selector">{/* TODO: Wrong className. Is this needed?? */}
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
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-main-controls">
              <div className="sidebar-header-search">
                <input
                  placeholder="Search..."
                  type="text"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
          <div className="sidebar-microbar panel-border-right">
            <div className="tag-picker">
              <div className="tag">Foobar</div>
              <div className="tag">Bar</div>
              <div className="tag selected">Bar Baz Qux</div>
            </div>
          </div>
          <div className="sidebar-main">
            <div className="sidebar-panel file-list">
              <div className="file">83-exploring-phasellus.wav</div>
              <div className="file">84-phasellus-waves.wav</div>
              <div className="file">85-phasellus-crickets.wav</div>
              <div className="file active">86-phasellus-beach-party.wav</div>
              <div className="file">87-phasellus-soundchecking.wav</div>
              <div className="file">88-jason-singing-in-the-shower.wav</div>
              <div className="file">89-jason-singing-on-the-night-road-walk.wav</div>
              <div className="file">90-last-dinner-in-mt-olympus-1.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
              <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="editor">{/* Component */}
          <Waveform width={mainWidth} />
          <div className="edit-form">
            <form>
              <input type="text" />
              <textarea></textarea>
              <textarea className="tags"></textarea>
            </form>
          </div>
          <div className="clip-list">
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line active">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
            <div className="clip-line">Lorem ipsum dolor sit amet</div>
          </div>
        </div>
        <div className="arranger"></div>
      </div>
    </div>
	)
}

export default AppView
