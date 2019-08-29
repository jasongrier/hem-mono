import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'

interface IProps {
  from: string[] | string
  children: any
}

function Exclude({ from, children }: IProps): ReactElement {
  if (typeof from === 'string') {
    from = [from]
  }

  return (
    <Switch>
      {from.map(path => (
        <Route
          exact
          key={path}
          path={path}
          component={() => children[1] || <></>}
        />
      ))}
      {children}
    </Switch>
  )
}

export default Exclude
