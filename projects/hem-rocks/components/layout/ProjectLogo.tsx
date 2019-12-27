import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { kebabCase } from 'voca'
import { TipPop } from '../ui'
import * as projectLogos from '../svg/project-logos'

interface IProps {
  hoverColor: string
  linkTo: string
  logoComponentName: string
  tipContent: string
  title: string

  transform?: string
}

function ProjectLogo({
  hoverColor,
  linkTo,
  logoComponentName,
  tipContent,
  title,

  transform,
}: IProps): ReactElement {
  const name = kebabCase(title)
  const LogoComponent = projectLogos[logoComponentName]
  const style = `
    .project-logo.${name}-project-logo svg {
      fill: #000;
      ${transform ? 'transform:' + transform : ''};
    }

    .project-logo.${name}-project-logo:hover {
      color: ${hoverColor};
    }

    .project-logo.${name}-project-logo:hover svg {
      fill: ${hoverColor};
    }
  `

  return (
    <div className={classnames({
      'project-logo': true,
      [`${name}-project-logo`]: true,
    })}>
      <style dangerouslySetInnerHTML={{__html: style}} />
      <Link to={linkTo}>
        <TipPop>
          <div dangerouslySetInnerHTML={{ __html: tipContent }} />
        </TipPop>
        <LogoComponent />
        <span>{title}</span>
      </Link>
    </div>
  )
}

export default ProjectLogo
