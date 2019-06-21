import React from 'react'
import { FaTag, FaFile, FaClipboard, FaSearch } from 'react-icons/fa'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="sidebar panel-border-right">
        <div className="sidebar-header panel-border-bottom">
          <div className="icon-button microbar-toggle">
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
              <div className="icon-button sidebar-select-files-mode">
                <FaFile />
              </div>
              <div className="icon-button sidebar-select-clips-mode">
                <FaClipboard />
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-microbar panel-border-right"></div>
        <div className="sidebar-main">
          <div className="sidebar-panel files"></div>
          <div className="sidebar-panel clips"></div>
        </div>
      </div>
      <div className="MainWindow">
        <div className="Editor"></div>
        <div className="Arranger"></div>
      </div>
    </div>
  )
}

export default App
