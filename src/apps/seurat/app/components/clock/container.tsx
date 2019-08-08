import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { someActionCreator, someThunkActionCreator } from './redux'
import ClockView from './view'

interface IOpts {
  foo: number
  bar: string
}

interface IProps {
  opts: IOpts
}

function ClockContainer({ opts: { foo, bar }}: IProps): ReactElement {
  const { someBit, anotherBit } = useSelector((state: RootState) => ({
    someBit: state.clock.someBit,
    anotherBit: state.clock.anotherBit,
  }))

  const dispatch = useDispatch()

  function onButtonClicked() {
    dispatch(someThunkActionCreator)
  }

  function onFormSubmitted() {
    dispatch(someActionCreator)
  }

  return (
    <ClockView
      foo={foo}
      bar={bar}
      someBit={someBit}
      anotherBit={anotherBit}
      onButtonClicked={onButtonClicked}
      onFormSubmitted={onFormSubmitted}
    />
  )
}

export default ClockContainer
