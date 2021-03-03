import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function ProjectsNav(): ReactElement {
  return (
    <nav className="projects-nav">
      <ul>
        <li>
          <Link to="/projects/orion">Orion</Link>
        </li>
      </ul>
    </nav>
  )
}

export default ProjectsNav
