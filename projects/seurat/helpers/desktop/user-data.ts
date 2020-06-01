import {app} from 'electron'
import {join} from 'path'
import {existsSync, readFileSync, writeFileSync} from 'fs'
import {addRendererAppUtil} from 'projekt/lib/helpers/desktop'

export const initUserData = (fileName: string, defaultUserData) => {
  const userDataPath = join(app.getPath('userData'), fileName)

  let userData
  if (existsSync(userDataPath)) {
    userData = JSON.parse(readFileSync(userDataPath, 'utf8'))
  }

  else {
    writeFileSync(userDataPath, JSON.stringify(defaultUserData))
    userData = defaultUserData
  }

  return userData
}

export const writeUserData = (userData, fileName) => {
  writeFileSync(join(app.getPath('userData'), fileName), JSON.stringify(userData))
}

addRendererAppUtil('writeUserData', writeUserData)
