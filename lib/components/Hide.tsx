import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'

interface IProps {
  from: string[] | string
  children: any
}

function Hide({ from, children }: IProps): ReactElement {
  if (typeof from === 'string') {
    from = [from]
  }

  const renderMain = children.length ? children[0] : children
  const renderAlternate = children.length ? children[1] : <></>

  return (
    <Switch>
      {from.map(path => (
        <Route
          exact
          key={path}
          path={path}
          component={() => renderAlternate}
        />
      ))}
      <Route component={() => <>{renderMain}</>} />
    </Switch>
  )
}

export default Hide
