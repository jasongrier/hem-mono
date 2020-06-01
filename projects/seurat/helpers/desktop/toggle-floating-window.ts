import {app, BrowserWindow} from 'electron'
import {addRendererAppUtil} from 'projekt/lib/helpers/desktop'

global['windowFloating'] = false

export const toggleFloatingWindow = () => {
  const win = BrowserWindow.getFocusedWindow()

  if (win.isAlwaysOnTop()) {
    app.dock.show()
    win.setAlwaysOnTop(false, 'normal', 0)
    global['windowFloating'] = false
  }

  else {
    win.setAlwaysOnTop(true, 'floating')
    global['windowFloating'] = true
  }
}

addRendererAppUtil('toggleFloatingWindow', toggleFloatingWindow)