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
          component={() => children[1] || <></>}
        />
      ))}
      <Route component={() => <>{children[0]}</>} />
    </Switch>
  )
}

export default Hide
