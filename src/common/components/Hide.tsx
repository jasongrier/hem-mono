import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'

interface IProps {
  on: string[] | string
  children: any
}

function Hide({ on, children }: IProps): ReactElement {
  if (typeof on === 'string') {
    on = [on]
  }

  return (
    <Switch>
      {on.map(path => (
        <Route
          exact
          key={path}
          path={path}
          component={() => <></>}
        />
      ))}
      <Route component={() => <>{children}</>} />
    </Switch>
  )
}

export default Hide
