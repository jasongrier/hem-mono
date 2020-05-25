import React, { PropsWithChildren, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import LogInForm from './LogInForm'
import { RootState } from '../../../index'

interface IProps {
  header?: string
}

function ProtectedContent({
  children,

  header = 'Log in to view this content'
}: PropsWithChildren<IProps>): ReactElement {
  const { loggedIn } = useSelector((state: RootState) => ({
    loggedIn: state.login.loggedIn,
  }))

  return (
    <div className={`
      protected-content
      ${!loggedIn ? 'blocked-content' : ''}
    `}>
      { loggedIn && (children) }
      { !loggedIn && (
        <LogInForm header={header} />
      )}
    </div>
  )
}

export default ProtectedContent
