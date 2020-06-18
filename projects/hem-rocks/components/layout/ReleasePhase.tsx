import React, { ReactElement, PropsWithChildren } from 'react'
import { RELEASE_PHASE } from '../../config'

interface IProps {
  phase: number

  exact?: boolean
}

function ReleasePhase({ children, phase, exact }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div
      className="release-phase"
      style={{ display: 'inline' }}
    >
      {
        ((exact && phase === RELEASE_PHASE)
        || (phase <= RELEASE_PHASE))
        && children
      }
    </div>
  )
}

export default ReleasePhase
