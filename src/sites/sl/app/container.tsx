import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { someActionCreator, someThunkActionCreator } from './redux'
import AppView from './view'

function AppContainer(): ReactElement {
  const { someBit, anotherBit } = useSelector((state: RootState) => ({
    someBit: state.app.someBit,
    anotherBit: state.app.anotherBit,
  }))

  const dispatch = useDispatch()

  function onButtonClicked() {
    dispatch(someThunkActionCreator)
  }

  function onFormSubmitted() {
    dispatch(someActionCreator)
  }

  return (
    <AppView />
  )
}

export default AppContainer
