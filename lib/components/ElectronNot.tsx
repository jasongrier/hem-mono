import React, { ReactElement, PropsWithChildren } from 'react'

interface IProps {
  showMessage?: boolean
}

function ElectronNot({ children, showMessage = false }: PropsWithChildren<IProps>): ReactElement {
  if (window.process?.env.ELECTRON_MONO_DEV) {
    if (showMessage) {
      return (
        <div className="electron-not electron-only-not-browser">
          <h1>Sorry</h1>
          <p>You are seeing this message because this project (or this particular part of this project) is only meant to run in browser mode.</p>
          <p>You'd probably want to go to your local copy and enter the following command:</p>
          <p>
            <code>
              npm run task start-electron [project-name]
            </code>
          </p>
        </div>
      )
    }

    else {
      return <div />
    }
  }

  return (
    <div className="electron-not">
      { children }
    </div>
  )
}

export default ElectronNot
