---
to: src/<%= name %>/container.tsx
---
import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { someActionCreator, someThunkActionCreator } from './redux'
import <%= Name %>View from './view'

interface IOpts {
  foo: number
  bar: string
}

interface IProps {
  opts: IOpts
}

function <%= Name %>Container({ opts: { foo, bar }}: IProps): ReactElement {
  const { someBit, anotherBit } = useSelector((state: RootState) => ({
    someBit: state.<%= name %>.someBit,
    anotherBit: state.<%= name %>.anotherBit,
  }))

  const dispatch = useDispatch()

  function onButtonClicked() {
    dispatch(someThunkActionCreator)
  }

  function onFormSubmitted() {
    dispatch(someActionCreator)
  }

  return (
    <<%= Name %>View
      foo={foo}
      bar={bar}
      someBit={someBit}
      anotherBit={anotherBit}
      onButtonClicked={onButtonClicked}
      onFormSubmitted={onFormSubmitted}
    />
  )
}

export default <%= Name %>Container
