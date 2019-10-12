import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { editorAction } from '../functions/text'
import TextArea from './TextArea'

function App(): ReactElement {
  const { bufferedCurrentContent, currentSelection, currentFrame } = useSelector((state: RootState) => ({
    bufferedCurrentContent: state.app.bufferedCurrentContent,
    currentSelection: state.app.currentSelection,
    currentFrame: state.app.timeline[state.app.timelineIndex],
  }))

  const dispatch = useDispatch()

  return (
    <div className="editor">
      <TextArea
        content={bufferedCurrentContent}
        editable={true}
        onKeyDown={(evt: any) => {
          dispatch(editorAction(currentFrame.lines, currentSelection, evt.keyCode))
        }}
      />
    </div>
  )
}

export default App
