import React, { PropsWithChildren, ReactElement } from 'react'
import { TopBar } from '../../../components/layout'

interface IProps {}

function ProjectFrame({ children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="jag-rip-site-frame">
      { children }
    </div>
  )
}

export default ProjectFrame
