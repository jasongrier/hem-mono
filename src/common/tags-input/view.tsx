import React, { ReactElement, useState } from 'react'
import './style.css'

interface IProps {
  tags: string[]
  onTagCreated: (tag: string) => void
}

function TagsInput({ tags, onTagCreated }: IProps): ReactElement {

  const [workingText, setWorkingText] = useState('')

  function onChange(evt: any) {
    setWorkingText(evt.currentTarget.value)
  }

  function onKeyDown(evt: any) {
    if (evt.keyCode === 13) {
      onTagCreated(evt.currentTarget.value)
      setWorkingText('')
    }
  }

  return (
    <div className="tags-input">
      <input
        type="text"
        value={workingText}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {tags.map((tag: string) => (
        <div className="tag">{tag}</div>
      ))}
    </div>
  )
}

export default TagsInput
