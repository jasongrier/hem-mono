import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'

function Dial(): ReactElement {
  const { codeEditorOpen } = useSelector((state: RootState) => ({
    codeEditorOpen: state.app.codeEditorOpen,
  }))

  const dispatch = useDispatch()

  return (
    <div className={`
      code-editor
        ${codeEditorOpen ? 'code-editor--' + codeEditorOpen : ''}
        ${codeEditorOpen ? 'code-editor--open' : ''}
      `}>
    </div>
  )
}

export default Dial
