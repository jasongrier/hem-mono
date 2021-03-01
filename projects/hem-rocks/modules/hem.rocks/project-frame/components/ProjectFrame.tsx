import React, { PropsWithChildren, ReactElement } from 'react'
import { ElectronNot } from '../../../../../lib/components'
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
      <ElectronNot>
        <footer className="main-footer">
          <SiteFooter />
        </footer>
      </ElectronNot>
    </div>
  )
}

export default ProjectFrame
