import React, { ReactElement } from 'react'
import clsx from 'clsx'
import './style.css'

interface IProps {
  ready: boolean
  children: ReactElement
}

function Spinner({ ready, children }: IProps): ReactElement {
  return (
    <div className={clsx('spinner', ready && 'ready')}>
      { children }
    </div>
  )
}

export default Spinner
