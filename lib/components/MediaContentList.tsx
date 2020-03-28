import React, { ReactElement } from 'react'

interface IProps {
  content: any
}

function MediaContentList({ content }: IProps): ReactElement {
  return (
    <div className="media-content-list">
      <h1>MediaContentList</h1>
    </div>
  )
}

export default MediaContentList
