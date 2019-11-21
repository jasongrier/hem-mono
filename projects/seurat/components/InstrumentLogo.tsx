import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function InstrumentLogo(): ReactElement {
  const { cursorGroup } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
  }))

  return (
    <div className={`instrument-logo instrument-logo--${cursorGroup}`}>
      <h1>
        <span>Seurat</span>
      </h1>
    </div>
  )
}

export default InstrumentLogo
