import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'

interface IProps {
  children: any
  from: string[] | string

  exact?: boolean
}

function Hide({ children, from, exact = false }: IProps): ReactElement {
  if (typeof from === 'string') {
    from = [from]
  }

  const renderMain = children.length ? children[0] : children
  const renderAlternate = children.length ? children[1] : <></>

  return (
    <Switch>
      {from.map(path => (
        <Route
          exact={exact}
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
