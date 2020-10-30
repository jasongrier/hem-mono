import React, { ReactElement, SyntheticEvent, useCallback } from 'react'

interface IProps {
}

function Midst({}: IProps): ReactElement {
  const editorOnChange = useCallback(
    function editorOnChangeFn(evt: SyntheticEvent<HTMLDivElement>) {
      console.log(evt.currentTarget.innerHTML)
    }, [],
  )

  return (
    <div className="midst">
      <div
        className="editor"
        contentEditable={true}
        onChange={editorOnChange}
      />
    </div>
  )
}

export default Midst
