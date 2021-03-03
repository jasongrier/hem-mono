import { divide } from 'lodash'
import React, { ReactElement, PropsWithChildren } from 'react'
import { RELEASE_PHASE } from '../../config'

interface IProps {
  phase: number

  exact?: boolean
  id?: string
}

function ReleasePhase({ children, exact, id, phase }: PropsWithChildren<IProps>): ReactElement {
  let canRender

  if (exact) {
    canRender = phase === RELEASE_PHASE
  }

  else {
    canRender = phase <= RELEASE_PHASE
  }

  if (!canRender) return (<div />)

  return (
    <div
      className="release-phase"
      id={id}
      style={{ display: 'inline' }}
    >
      { children }
    </div>
  )
}

export default ReleasePhase
