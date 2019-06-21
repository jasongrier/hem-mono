import React from 'react'
import { FaTag, FaFile, FaClipboard, FaSearch, FaEdit, FaLayerGroup } from 'react-icons/fa'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="sidebar panel-border-right">
        <div className="sidebar-header panel-border-bottom">
          <div className="icon-button active microbar-toggle">
            <FaTag />
          </div>
          <div className="sidebar-main-controls">
            <div className="sidebar-header-search">
              <FaSearch />
              <input
                type="text"
                spellCheck={false}
              />
            </div>
            <div className="sidebar-mode-selector">
              <div className="icon-button active">
                <FaFile />
              </div>
              <div className="icon-button">
                <FaClipboard />
              </div>
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

          </div>
          <div className="sidebar-panel clips"></div>
        </div>
      </div>
      <div className="main">
        <div className="main-header panel-border-bottom">
          <div className="main-mode-selector">
            <div className="icon-button active">
              <FaEdit />
            </div>
            <div className="icon-button">
              <FaLayerGroup />
            </div>
          </div>
        </div>
        <div className="editor"></div>
        <div className="arranger"></div>
      </div>
    </div>
  )
}

export default App
