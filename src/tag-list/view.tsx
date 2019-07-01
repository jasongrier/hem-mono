import React, { ReactElement } from 'react'
import { ITag } from '../project/types'
import './style.css'

interface IProps {
  tags: ITag[]
  onTagClicked: (tag: ITag) => void
}

function TagList({ tags, onTagClicked }: IProps): ReactElement {
  return (
    <div className="tag-picker">
      {tags.map(tag =>
        <div
          key={tag.name}
          className="tag"
          onClick={() => onTagClicked(tag)}
        >
          {tag.name}
        </div>
      )}
    </div>
  )
}

export default TagList
