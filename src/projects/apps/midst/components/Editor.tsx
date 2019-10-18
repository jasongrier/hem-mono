import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { editorActions, bufferEditorActions } from '../functions/text'
import TextArea from './TextArea'

function App(): ReactElement {
  const { bufferedCurrentContent, currentSelection, currentFrame } = useSelector((state: RootState) => ({
    bufferedCurrentContent: state.app.bufferedCurrentContent,
    currentSelection: state.app.currentSelection,
    currentFrame: state.app.timeline[state.app.timelineIndex],
  }))

  return (
    <div className="editor">
      <TextArea
        content={bufferedCurrentContent}
        editable={true}
        onKeyDown={(evt: any) =>
          bufferEditorActions(editorActions(currentFrame.lines, currentSelection, evt.keyCode))
        }
      />
    </div>
  )
}

export default App
