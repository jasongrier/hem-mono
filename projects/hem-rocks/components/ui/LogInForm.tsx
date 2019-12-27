import React, { PropsWithChildren, ReactElement, useCallback, useState, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../index'
import { logIn, logInResetError } from '../../modules/login'

interface IProps {
  header?: string
}

function LogInForm({ header }: PropsWithChildren<IProps>): ReactElement {
  const { loginFailed } = useSelector((state: RootState) => ({
    loggedIn: state.login.loggedIn,
    loginFailed: state.login.loginFailed,
  }))

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailInputChanged = useCallback(
    function onEmailInputChanged(evt: SyntheticEvent<HTMLInputElement>) {
      loginFailed && dispatch(logInResetError())
      setEmail(evt.currentTarget.value)
    }, [loginFailed],
  )

  const onPasswordInputChanged = useCallback(
    function onPasswordInputChanged(evt: SyntheticEvent<HTMLInputElement>) {
      loginFailed && dispatch(logInResetError())
      setPassword(evt.currentTarget.value)
    }, [loginFailed],
  )

  const onSubmit = useCallback(
    function onSubmit(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()
      dispatch(logIn(email, password))
    }, [email, password],
  )

  return (
    <div className="login-form">
      <form onSubmit={onSubmit}>
        { header && (
          <h2>{ header }</h2>
        )}
        { loginFailed && (
          <p className="error-message">Login failed. Try again</p>
        )}
        <input
          name="Username"
          onChange={onEmailInputChanged}
          placeholder="Email"
          type="text"
          value={email}
        />
        <input
          name="Password"
          onChange={onPasswordInputChanged}
          placeholder="Password"
          type="password"
          value={password}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LogInForm
