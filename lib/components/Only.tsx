import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'

interface IProps {
  on: string[] | string
  children: any
}

function Only({ on, children }: IProps): ReactElement {
  if (typeof on === 'string') {
    on = [on]
  }

  const renderMain = children.length ? children[0] : children
  const renderAlternate = children.length ? children[1] : <></>

  return (
    <Switch>
      {on.map(path => (
        <Route
          exact
          key={path}
          path={path}
          component={(path: string) => renderMain}
        />
      ))}
      {renderAlternate}
    </Switch>
  )
}

export default Only
