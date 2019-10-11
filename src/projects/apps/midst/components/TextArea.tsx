import React, { ReactElement, useEffect, useRef } from 'react'

interface IProps {
  content: string
  editable: boolean
  onChange: (content: string) => void
}

function TextArea({ content, editable, onChange }: IProps): ReactElement {
  const el = useRef(null)

  useEffect(() => {
    (document as any).querySelector('.text-area').addEventListener('input', () => {
      onChange((el as any).current.innerHTML)
    }, false)
  }, [])

  return (
    <>
      <div
        className="text-area"
        contentEditable={editable}
        dangerouslySetInnerHTML={{__html: content}}
        ref={el}
      />
    </>
  )
}

export default TextArea
