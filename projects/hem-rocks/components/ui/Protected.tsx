import React, { PropsWithChildren, ReactElement } from 'react'
import { AnyAction } from 'redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import LogInForm from './LogInForm'

function Protected({ children }: PropsWithChildren<{}>): ReactElement {
  const { loggedIn } = useSelector((state: RootState) => ({
    loggedIn: state.app.loggedIn,
  }))

  return (
    <div className="protected">
      { loggedIn && (children) }
      { !loggedIn && (
        <LogInForm />
      )}
    </div>
  )
}

export default Protected
