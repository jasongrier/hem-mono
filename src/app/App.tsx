import React from 'react'
import { FaTag, FaFile, FaClipboard, FaSearch, FaEdit, FaLayerGroup, FaProjectDiagram, FaBars } from 'react-icons/fa'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="sidebar panel-border-right">
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
          <div className="tag">Foo</div>
          <div className="tag">Bar</div>
          <div className="tag selected">Bar Baz Qux</div>
        </div>
        <div className="sidebar-main">
          <div className="sidebar-panel files">
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
          <div className="sidebar-panel clips"></div>
        </div>
      </div>
      <div className="main">
        <div className="main-header panel-border-bottom">
          <div className="sidebar-toggle">
            <div className="icon-button active">
              <FaBars />
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
          <div className="edit-form"></div>
          <div className="clips-list"></div>
        </div>
        <div className="arranger"></div>
      </div>
    </div>
  )
}

export default App
