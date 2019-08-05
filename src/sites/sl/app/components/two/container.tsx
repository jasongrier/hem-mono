import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { someActionCreator, someThunkActionCreator } from './redux'
import TwoView from './view'

function TwoContainer(): ReactElement {
  return (
    <TwoView />
  )
}

export default TwoContainer
