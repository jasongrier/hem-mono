import {BrowserWindow} from 'electron'

export const getSingleWindowAppMainWindow = () => {
  return BrowserWindow.getAllWindows()[0]
}