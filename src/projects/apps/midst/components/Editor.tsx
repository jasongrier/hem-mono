import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { tmpUpdateContent } from '../store/actions'
import TextArea from './TextArea'

function App(): ReactElement {
  const { currentFrame } = useSelector((state: RootState) => ({
    currentFrame: state.app.timeline[state.app.timelineIndex],
  }))

  const dispatch = useDispatch()

  console.log(currentFrame)

  return (
    <div className="editor">
      <TextArea
        content={currentFrame.content}
        editable={true}
        onChange={(content: string) => {
          dispatch(tmpUpdateContent(content))
        }}
      />
    </div>
  )
}

export default App
