import { debounce } from 'lodash'
import React, { ReactElement, ChangeEvent } from 'react'
import './style.css'

interface IProps {
  onChange: (search: string) => void
}

function SearchView({ onChange }: IProps): ReactElement {
  function handleOnChange(evt: ChangeEvent<HTMLInputElement>) {
    evt.persist()
    console.log(evt.currentTarget.value)
    return debounce(() => onChange(evt.currentTarget.value), 500)
  }

  return (
    <input
      placeholder="Search..."
      type="text"
      spellCheck={false}
      onChange={handleOnChange}
    />
  )
}

export default SearchView
