import React, { PropsWithChildren, ReactElement, useCallback, useState, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { logIn, logInReset } from '../../store/actions'

interface IProps {
  header?: string
}

function LogInForm({ header }: PropsWithChildren<IProps>): ReactElement {
  const { loggedIn, loginFailed } = useSelector((state: RootState) => ({
    loggedIn: state.app.loggedIn,
    loginFailed: state.app.loginFailed,
  }))

  const dispatch = useDispatch()

  const [password, setPassword] = useState('')

  const onInputChanged = useCallback(
    function onInputChanged(evt: SyntheticEvent<HTMLInputElement>) {
      dispatch(logInReset())
      setPassword(evt.currentTarget.value)
    }, [],
  )

  const onSubmit = useCallback(
    function onSubmit(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()
      dispatch(logIn(password))
    }, [password],
  )

  return (
    <div className="log-in-form">
      <form onSubmit={onSubmit}>
        { header && (
          <h2>Enter Password</h2>
        )}
        { loginFailed && (
          <strong>Login failed. Try again</strong>
        )}
        <input
          onChange={onInputChanged}
          type="text"
          value={password}
        />
      </form>
    </div>
  )
}

export default LogInForm
