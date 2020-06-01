import {dialog} from 'electron'
import {getSingleWindowAppMainWindow} from './get-single-window-app-main-window'
import {addRendererAppUtil} from './add-renderer-app-util'

export const showWarning = async ({message, detail, buttons, cancelId}) => {
  const promise = new Promise((resolve) => {
    dialog.showMessageBox(
      getSingleWindowAppMainWindow(),
      {
        type: 'warning',
        message,
        detail,
        buttons,
        cancelId,
      },
      resolve,
    )
  })

  return promise.then()
}

addRendererAppUtil('showWarning', showWarning)
