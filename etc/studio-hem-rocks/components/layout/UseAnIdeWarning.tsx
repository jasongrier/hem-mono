import React, { ReactElement } from 'react'

function UseAnIdeWarning(): ReactElement {
  return (
    <div className="warning-box use-an-ide-warning">
      <p>The components on this page are meant to be used in the live coding environment</p>
      <p>See the README for how to set that up</p>
    </div>
  )
}

export default UseAnIdeWarning
