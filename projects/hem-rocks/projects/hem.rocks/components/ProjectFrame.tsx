import React, { PropsWithChildren, ReactElement } from 'react'
import { SiteFooter, TopBar } from '../../../components/layout'

interface IProps {}

function ProjectFrame({ children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="project-frame project-frame-hem-rocks">
      <TopBar />
      <div className="scroll-lock-container">
        <div className="scroll-lock-content">
          <main className="main-content">
            { children }
          </main>
          <footer className="main-footer">
            <SiteFooter />
          </footer>
        </div>
      </div>
    </div>
  )
}

export default ProjectFrame
