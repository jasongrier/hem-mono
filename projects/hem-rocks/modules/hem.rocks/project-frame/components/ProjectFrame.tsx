import React, { PropsWithChildren, ReactElement } from 'react'
import { ElectronNot } from '../../../../../../lib/components'
import { SiteFooter } from '../../../../components/layout'
import '../../../../styles/hem.rocks'

interface IProps {}

function ProjectFrame({ children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      { children }
      <ElectronNot>
        <footer className="main-footer">
          <SiteFooter />
        </footer>
      </ElectronNot>
    </>
  )
}

export default ProjectFrame
