import React, { ReactElement, SFC } from 'react'
import { kebabCase } from 'voca'
import { Link } from 'react-router-dom'

interface IProps {
  index: number
  hoverColor: string
  linkTo: string
  logo: SFC
  title: string

  transform?: string
}

function ProjectsListLogo({
  index,
  hoverColor,
  linkTo,
  logo: Logo,
  title,

  transform,
}: IProps): ReactElement {
  const name = kebabCase(title)
  const style = `
    .projects-list-logo.${name}-project-logo svg {
      fill: #000;
      ${transform ? 'transform:' + transform : ''};
    }

    .projects-list-logo.${name}-project-logo:hover {
      color: ${hoverColor};
    }

    .projects-list-logo.${name}-project-logo:hover svg {
      fill: ${hoverColor};
    }
  `

  return (
    <div className={`projects-list-logo ${name}-project-logo ${index < 3 ? 'projects-list-logo-featured' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: style}} />
      <Link to={linkTo}>
        <Logo />
        <span>{title}</span>
      </Link>
    </div>
  )
}

export default ProjectsListLogo
