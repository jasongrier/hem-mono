import React, { ReactElement, useEffect, useRef, SyntheticEvent } from 'react'

interface IProps {
  content: string
  editable: boolean
  // onChange: (evt: SyntheticEvent<HTMLTextAreaElement>) => void
  // onChange: (content: string) => void
  onChange: (foo: any) => void
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
        // dangerouslySetInnerHTML={{__html: content}}
        ref={el}
      />
      <textarea
        className="text-area"
        onChange={onChange}
      >
        {/* {content} */}
      </textarea>
    </>
  )
}

export default TextArea
