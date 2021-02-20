import React, { PropsWithChildren, ReactElement } from 'react'
import { SiteFooter, TopBar } from '../../../components/layout'
import '../../../styles/hem.rocks'

interface IProps {}

function ProjectFrame({ children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="project-frame project-frame-hem-rocks">
      <TopBar />
      <div className="main-hem">
        { children }
      </div>
      <footer className="main-footer">
        <SiteFooter />
      </footer>
    </div>
  )
}

export default ProjectFrame
