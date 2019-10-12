import React, { ReactElement, useEffect, useRef, SyntheticEvent } from 'react'

interface IProps {
  content: string
  editable: boolean
  onKeyDown: (evt: any) => void
}

function TextArea({ content, editable, onKeyDown }: IProps): ReactElement {
  return (
    <>
      <div
        className="text-area"
        contentEditable={editable}
        dangerouslySetInnerHTML={{__html: content}}
        onKeyDown={onKeyDown}
      />
    </>
  )
}

export default TextArea
