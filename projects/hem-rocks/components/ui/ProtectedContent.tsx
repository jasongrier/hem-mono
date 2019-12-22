import React, { PropsWithChildren, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import LogInForm from './LogInForm'

interface IProps {
  header?: string
}

function ProtectedContent({ children, header }: PropsWithChildren<IProps>): ReactElement {
  const { loggedIn } = useSelector((state: RootState) => ({
    loggedIn: state.app.loggedIn,
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
