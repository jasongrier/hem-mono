import React, { useContext } from 'react'
import {
  FaEdit,
  FaLayerGroup,
  FaProjectDiagram,
  FaCaretSquareRight,
} from 'react-icons/fa'
import { AppContext } from './AppContainer'
import './App.css'

function AppView(): React.ReactElement {
	const { app, dispatchApp } = useContext(AppContext)

	function handleSidebarClick() {
    dispatchApp({ type: 'TOGGLE_SIDEBAR' })
	}

  const appClassName = `app ${app.sidebarOpen ? ' has-sidebar' : ''}`

  return (
		<div className={appClassName}>
		  <div className="app-header">
        <div className="sidebar-toggle">
          <div
            className="icon-button active"
            onClick={handleSidebarClick}
          >
            <FaCaretSquareRight />
          </div>
        </div>
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
          <div className="waveform">{/* Component */}
            <div className="bars">
              <div className="top-bars">{/* Component */}
                { app.waveformData.map((amplitude: number, i: number) =>
                  <div
                    key={i}
                    className="bar"
                    style={{height: ((amplitude + 1) * 50) + '%'}}
                  />
                )}
              </div>
              <div className="bottom-bars">
                { app.waveformData.map((amplitude: number, i: number) =>
                  <div
                    key={i}
                    className="bar"
                    style={{height: ((amplitude + 1) * 50) + '%'}}
                  />
                )}
              </div>
            </div>
            <div className="markers"></div>
            <div className="waveform-status-bar"></div>
          </div>
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
