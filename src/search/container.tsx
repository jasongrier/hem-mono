import { debounce } from 'lodash'
import React, { ReactElement, ChangeEvent } from 'react'
import View from './view'

function SearchContainer(): ReactElement {

  function handleOnChange(evt: ChangeEvent<HTMLInputElement>) {
    console.log(evt.currentTarget.value)
  }

  return (
    <View onChange={console.log} />
  )
}

export default SearchContainer
