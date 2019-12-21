import React, { ReactElement, SFC } from 'react'
import { kebabCase } from 'voca'
import { Link } from 'react-router-dom'
import { TipPop } from '../ui'

interface IProps {
  hoverColor: string
  index: number
  linkTo: string
  logo: SFC
  tipContent: string
  tipTitle: string
  title: string

  transform?: string
}

function ProjectsListLogo({
  index,
  hoverColor,
  linkTo,
  logo: Logo,
  tipContent,
  tipTitle,
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
        <TipPop>
          <h2>{ tipTitle }</h2>
          <p>{ tipContent }</p>
        </TipPop>
        <Logo />
        <span>{title}</span>
      </Link>
    </div>
  )
}

export default ProjectsListLogo
