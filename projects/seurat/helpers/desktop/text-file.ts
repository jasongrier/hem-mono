import {last} from 'lodash'
import {homedir} from 'os'
import {extname, join} from 'path'
import {readFileSync, writeFileSync, readdirSync} from 'fs'
import {app, dialog} from 'electron'
import {addRendererAppUtil} from './add-renderer-app-util'
import {showWarning} from './show-warning'
import {getSingleWindowAppMainWindow} from 'projekt/lib/helpers/desktop'

export const openTextFile = (path) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  }

  catch (err) {
    console.log(err)
    return false
  }
}

export const openTextFileFromDialog = (filters) => {
  dialog.showOpenDialog({properties: ['openFile'], filters}, (filePaths) => {
    if (filePaths) {
      app.addRecentDocument(filePaths[0])
      const title = last(filePaths[0].split('/'))
      const data = openTextFile(filePaths[0])
      getSingleWindowAppMainWindow().webContents.send('fileOpened', {title, data, path: filePaths[0]})
    }
  })
}

export const openFolderOfTextFilesFromDialog = (ext, cb?) => {
  dialog.showOpenDialog({properties: ['openDirectory']}, (dirPath) => {
    const files = []
    for (const fileName of readdirSync(dirPath[0])) {
      if (extname(fileName) === ext) {
        const filePath = join(dirPath[0], fileName)
        files.push({data: openTextFile(filePath), path: filePath})
      }
    }
    getSingleWindowAppMainWindow().webContents.send('folderOpened', files)
    cb && cb()
  })
}

export const saveTextFile = (filename, fileData) => {
  try {
    writeFileSync(filename, JSON.stringify(fileData))
    return filename
  }

  catch (err) {
    console.log(err)
    return false
  }
}

export const saveTextFileAs = async (fileData) => {
  const promise = new Promise((resolve) => {
    dialog.showSaveDialog(
      getSingleWindowAppMainWindow(),
      {
        filters: [{name: 'Seurat Files', extensions: ['seu']}],
      },
      (filename) => {
        if (filename) {
          writeFileSync(filename, JSON.stringify(fileData))
          resolve(filename)
        }

        else {
          resolve(false)
        }
      },
    )
  })

  return promise.then()
}

export const showUnsavedChangesWarning = async (title) => {
  return await showWarning({
    message: 'Do you want to save the changes you made to ' + title + '?',
    detail: 'Your changes will be lost if you don\'t save them.',
    buttons: ['Save', 'Cancel', 'Don\'t Save'],
    cancelId: 1,
  })
}

addRendererAppUtil('saveTextFile', saveTextFile)
addRendererAppUtil('saveTextFileAs', saveTextFileAs)
addRendererAppUtil('openTextFileFromDialog', openTextFileFromDialog)
addRendererAppUtil('openFolderOfTextFilesFromDialog', openFolderOfTextFilesFromDialog)
addRendererAppUtil('showUnsavedChangesWarning', showUnsavedChangesWarning)