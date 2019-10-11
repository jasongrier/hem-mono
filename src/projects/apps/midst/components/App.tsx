import React, { ReactElement } from 'react'
import TextArea from './TextArea'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <TextArea
        content="foo"
        editable={true}
        onChange={(content: string) => {
          console.log(content)
        }}
      />
    </div>
  )
}

export default App
