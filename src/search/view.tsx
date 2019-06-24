import { debounce } from 'lodash'
import React, { ReactElement, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import './style.css'

interface IProps {
  debounceTime?: number
  onSearch: (search: string) => void
}

function Search({ debounceTime = 200, onSearch }: IProps): ReactElement {
  const [searchText, setSearchText] = useState('')

  const [debouncedCallback] = useDebouncedCallback(
    value => onSearch(value),
    debounceTime,
  )

  return (
    <input
      placeholder="Search..."
      type="text"
      spellCheck={false}
      value={searchText}
      onChange={e => {
        setSearchText(e.target.value)
        debouncedCallback(e.target.value)
      }}
    />
  )
}

export default Search
