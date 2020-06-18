import React, { ReactElement, PropsWithChildren } from 'react'
import { RELEASE_PHASE } from '../../config'

interface IProps {
  phase: number
}

function ReleasePhase({ children, phase }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div
      className="release-phase"
      style={{ display: 'inline' }}
    >
      { phase <= RELEASE_PHASE && children }
    </div>
  )
}

export default ReleasePhase
