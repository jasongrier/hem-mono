import React, { ReactElement } from 'react'
import { noop } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
// import { loadCodeSnippet } from '../store/actions'
import { RootState } from '../store'

/**
 * ** Code Editor **
 *
 * Code editor fires once per tick
 *
 * Global variables are provided, each with a type shape `{ color, flashing }` or null
 *
 * const self
 * const neighborTop
 * const neighborTopRight
 * const neighborRight
 * const neighborBottomRight
 * const neighborBottom
 * const neighborBottomLeft
 * const neighborLeft
 * const neighborTopLeft
 *
 * Code editor is treated as a function body that says what each dot should do next
 *
 * It should return an instance of `self`
 *
 * If nothing is returned, then self remains what it was on the last tick
 *
 * Errors will be caught so the app doesn't crash
 *
 * Code editor allows any Javascript code allowed in https://codepen.io/
 *
 * ** Example **
 *
 * if (
 *   neighborTop
 *   && neighborTop.color === self.color
 *   && neighborTop.flashing)
 * {
 *   return { color: self.color, flashing: }
 * }
*/

function CodeEditor(): ReactElement {
  const { codeEditorOpen } = useSelector((state: RootState) => ({
    codeEditorOpen: state.app.codeEditorOpen,
  }))

  const dispatch = useDispatch()

  const loadCodeSnippet = noop // TODO: Create action and remove dummy

  return (
    <div className={`
      code-editor
        ${codeEditorOpen ? 'code-editor--' + codeEditorOpen : ''}
        ${codeEditorOpen ? 'code-editor--open' : ''}
    `}>
      <div className="code-editor__snippets">
        <ul>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'ripple'))}>
            Ripple
          </li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'shear'))}>
            Shear
          </li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'radiate'))}>
            Radiate
          </li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'chaotic'))}>
            Chaotic
          </li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'rule'))}>
            Rule
            30</li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'ant'))}>
            Ant
          </li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'wireworld'))}>
            Wireworld
          </li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'glider'))}>
            Glider
            Gun</li>
          <li onClick={() => dispatch(loadCodeSnippet(codeEditorOpen, 'game'))}>
            Game
            of Life</li>
        </ul>
      </div>
    </div>
  )
}

export default CodeEditor
