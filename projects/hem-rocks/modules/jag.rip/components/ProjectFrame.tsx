import React, { PropsWithChildren, ReactElement } from 'react'

interface IProps {}

function ProjectFrame({}: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="jag-rip-site-frame"></div>
  )
}

export default ProjectFrame
