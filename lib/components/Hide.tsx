import React, { Children, PropsWithChildren, ReactElement } from 'react'
import { useLocation } from 'react-router'

interface IProps {
  from: string[] | string

  fallback?: any
}

function Hide({ from, children, fallback }: PropsWithChildren<IProps>): ReactElement {
  const { pathname } = useLocation()

  if (typeof from === 'string') {
    from = [from]
  }

  fallback = fallback || <></>

  let hide = false

  for (const pathPart of from) {
    if (pathname.includes(pathPart)) {
      hide = true
      break
    }
  }

  return (
    <div className="hem-hide">
      { children }
    </div>
  )
}

export default Hide
