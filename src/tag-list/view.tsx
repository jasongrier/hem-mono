import React, { ReactElement } from 'react'
import './style.css'

interface IProps {
  tags: string[]
  onTagClicked: (tag: string) => void
}

function TagList({ tags, onTagClicked }: IProps): ReactElement {
  return (
    <div className="tag-picker">
      {tags.map(tag =>
        <div
          key={tag} // TODO: Use uid
          className="tag"
          onClick={() => onTagClicked(tag)}
        >
          {tag}
        </div>
      )}
    </div>
  )
}

export default TagList
