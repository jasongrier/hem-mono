import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { IProjectLogo } from '../../modules/misc'
import ProjectLogo from './ProjectLogo'

interface IProps {
  projects: IProjectLogo[]
}

function ProjectsGrid({ projects }: IProps): ReactElement {
  return (
    <div className="projects-grid">
      {projects.map((projectLogo, index) => (
        <ProjectLogo
          key={index}
          {...projectLogo}
        />
      ))}

      <div className="projects-grid-ghost-cta">
        <Link
          className="ghost-cta"
          to="/projects"
        >
          more projects...
        </Link>
      </div>
    </div>
  )
}

export default ProjectsGrid
