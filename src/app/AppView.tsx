import React, { useContext } from 'react'
import { FaTag, FaFile, FaClipboard, FaSearch, FaEdit, FaLayerGroup, FaProjectDiagram, FaBars, FaExpand, FaFolderOpen, FaFileUpload, FaArrowAltCircleRight, FaExpandArrowsAlt } from 'react-icons/fa'
import { AppContext } from './AppContainer'
import './App.css'

function AppView(): React.ReactElement {
	const { app, dispatchApp } = useContext(AppContext)

	function handleSidebarClick() {
    dispatchApp({ type: 'TOGGLE_SIDEBAR' })
	}

	const appClassName = `app ${app.sidebarOpen ? ' has-sidebar' : ''}`
	const sidebarClassName = `sidebar ${app.sidebarOpen ? ' panel-border-right' : ''}`

  return (
		<div className={appClassName}>
      <div className={sidebarClassName}>
        <div className="sidebar-content">
          <div className="sidebar-header panel-border-bottom">
          <div className="sidebar-main-controls">
            <div className="sidebar-header-search">
              <input
                type="text"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
          <div className="sidebar-microbar panel-border-right">
          {/* <div className="sidebar-subheader panel-border-bottom">
            <div className="icon-button">
              <FaExpandArrowsAlt />
            </div>
          </div> */}
          <div className="tag-picker">
            <div className="tag">Foo</div>
            <div className="tag">Bar</div>
            <div className="tag selected">Bar Baz Qux</div>
          </div>
        </div>
          <div className="sidebar-main">
          {/* <div className="sidebar-subheader panel-border-bottom">
            <div className="icon-button">
              <FaFolderOpen />
            </div>
            <div className="icon-button">
              <FaFile />
            </div>
          </div> */}
          <div className="sidebar-panel file-list">
            <div className="file">83-exploring-phasellus.wav</div>
            <div className="file">84-phasellus-waves.wav</div>
            <div className="file">85-phasellus-crickets.wav</div>
            <div className="file">86-phasellus-beach-party.wav</div>
            <div className="file">87-phasellus-soundchecking.wav</div>
            <div className="file">88-jason-singing-in-the-shower.wav</div>
            <div className="file">89-jason-singing-on-the-night-road-walk.wav</div>
            <div className="file">90-last-dinner-in-mt-olympus-1.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
          </div>
        </div>
        </div>
      </div>
      <div className="main">
        <div className="main-header panel-border-bottom">
          <div className="sidebar-toggle">
						<div
							className="icon-button active"
							onClick={handleSidebarClick}
						>
              <FaArrowAltCircleRight />
            </div>
          </div>
          <h2 className="project-title">Project: Antalya</h2>
          <div className="main-mode-selector">
            <div className="icon-button">
              <FaProjectDiagram />
            </div>
            <div className="icon-button active">
              <FaEdit />
            </div>
            <div className="icon-button">
              <FaLayerGroup />
            </div>
          </div>
        </div>
        <div className="editor">
          <div className="waveform">
            <div className="markers"></div>
          </div>
          <div className="edit-form">
            <form>
              <input type="text" />
              <textarea></textarea>
              <textarea></textarea>
              <input type="submit" />
            </form>
          </div>
          <div className="clip-list">
            <div className="clip">Lorem ipsum dolor sit amet</div>
            <div className="clip">Lorem ipsum dolor sit amet</div>
            <div className="clip">Lorem ipsum dolor sit amet</div>
            <div className="clip">Lorem ipsum dolor sit amet</div>
            <div className="clip">Lorem ipsum dolor sit amet</div>
            <div className="clip">Lorem ipsum dolor sit amet</div>
            <div className="clip">Lorem ipsum dolor sit amet</div>
            <div className="clip">Lorem ipsum dolor sit amet</div>
          </div>
        </div>
        <div className="arranger"></div>
      </div>
    </div>
	)
}

export default AppView
