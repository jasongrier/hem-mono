import React, { ReactElement } from 'react'

function ProjectSplashScreen(): ReactElement {
  return (
    <div className="project-splash-screen">
      <ul>
        <li>
          <button>
            <i className="fa-icon fas fa-folder-open"></i>
            Open Project
          </button>
        </li>
        <li>
          <button>
            <i className="fa-icon fas fa-plus-circle"></i>
            New Project
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProjectSplashScreen
