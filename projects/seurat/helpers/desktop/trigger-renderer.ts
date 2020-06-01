import {getSingleWindowAppMainWindow} from './get-single-window-app-main-window'

const triggerRenderer = (name, value?) => {
  getSingleWindowAppMainWindow().webContents.send(name, value)
}

const triggerRendererHandler = (name, value?) => () => {
  getSingleWindowAppMainWindow().webContents.send(name, value)
}

export {triggerRenderer, triggerRendererHandler}