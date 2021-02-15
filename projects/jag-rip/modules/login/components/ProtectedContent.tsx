import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogInForm from './LogInForm'
import { logInCheckRequest } from '../index'
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

  const dispatch = useDispatch()

  useEffect(function logInCheck() {
    dispatch(logInCheckRequest())
  }, [])

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
