import React, { ReactElement, PropsWithChildren } from 'react'

interface IProps {
  showMessage?: boolean
}

function ElectronOnly({ children, showMessage = false }: PropsWithChildren<IProps>): ReactElement {
  if (window.process?.env.ELECTRON_MONO_DEV) {
    return (
      <div className="electron-only">
        { children }
      </div>
    )
  }

  if (showMessage) {
    return (
      <div className="electron-only electron-only-not-electron">
        <h1>Sorry</h1>
        <p>You are seeing this message because this project (or this particular part of this project) is only meant to run in app mode.</p>
        <p>You'd probably want to go to your local copy and enter the following command:</p>
        <p>
          <code>
            npm run task start-electron [project-name]
          </code>
        </p>
      </div>
    )
  }

  return (
    <div />
  )
}

export default ElectronOnly
