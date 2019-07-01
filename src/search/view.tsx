import { debounce } from 'lodash'
import React, { ReactElement, useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import './style.css'

interface IProps {
  debounceTime?: number
  searchText: string
  onSearch: (search: string) => void
}

function Search({ debounceTime = 200, searchText, onSearch }: IProps): ReactElement {
  const [workingSearchText, setWorkingSearchText] = useState('')

  const [debouncedCallback] = useDebouncedCallback(
    value => onSearch(value),
    debounceTime,
  )

  useEffect(() => { setWorkingSearchText(searchText) }, [searchText])

  return (
    <input
      placeholder="Search..."
      type="text"
      spellCheck={false}
      value={workingSearchText}
      onChange={e => {
        setWorkingSearchText(e.target.value)
        debouncedCallback(e.target.value)
      }}
    />
  )
}

export default Search
