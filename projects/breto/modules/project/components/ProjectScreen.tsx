import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FileList } from '../../files'
import { RootState } from '../../../index'

function ProjectScreen(): ReactElement {
  const { currentProjectTitle } = useSelector((state: RootState) => ({
    currentProjectTitle: state.project.currentProjectTitle,
  }))

  const [viewMode, setViewMode] = useState('files')

  return (
    <div className="project-screen">
      <header>
        <h1>{ currentProjectTitle }</h1>

        <nav className="view-mode-nav">
          <button onClick={() => setViewMode('files')}>Files</button>
          <button onClick={() => setViewMode('clips')}>Clips</button>
          <button onClick={() => setViewMode('sections')}>Sections</button>
        </nav>
      </header>
      <main>
        <aside>
          { viewMode === 'files' && (
            <FileList />
          )}
          {/* { viewMode === 'clips' && (
            <ClipList />
          )}
          { viewMode === 'sections' && (
            <SectionList />
          )} */}
        </aside>
        <div className="detail-view">
          {/* { viewMode === 'files' && (
            <ClipEditor />
          )}
          { viewMode === 'clips' && (
            <SectionEditor />
          )}
          { viewMode === 'sections' && (
            <OutlineEditor />
          )} */}
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default ProjectScreen
