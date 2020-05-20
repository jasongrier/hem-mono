import React, { ReactElement, useEffect, useState } from 'react'
import uuid from 'uuid/v1'
import { autoParagraph } from '../../../../../lib/functions'

const { remote } = window.require('electron')
const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
const { extname, join } = remote.require('path')
const { execSync } = remote.require('child_process')

// @ts-ignore
window.autop = autoParagraph
// @ts-ignore
window.uuid = uuid

function AdminConvert(): ReactElement {
  const [converting, setConverting] = useState(true)

  useEffect(() => {
    const contentSubDirs = [
      'jason-grier',
      'label',
      'mixes',
      'projects',
      'sound-library',
    ]

    const srcDir = join(__dirname, '..', '..', '..', 'static', 'old-content')
    const destDir = join(__dirname, '..', '..', '..', 'static', 'content')

    if (existsSync(destDir)) {
      execSync(`rm -rf ${destDir}`)
    }

    if (existsSync(destDir)) {
      execSync(`rm -rf ${destDir}`)
    }

    execSync(`mkdir ${destDir}`)

    const index = []

    for (const contentSubDir of contentSubDirs) {
      const contentSubDirPath = join(srcDir, contentSubDir)
      const candidates = readdirSync(contentSubDirPath)

      for (const candidate of candidates) {
        if (extname(candidate) === '.ts') {
          const data = readFileSync(`${contentSubDirPath}/${candidate}`, 'utf8')
          const subject = data.split('const')[1].split('}')[0]
          const itemVarName = subject.split('{')[0].split(':')[0]
          const fieldBlock = subject.split('{')[1].replace(/\r?\n|\r/g, '')

          try {
            const item = eval('({' + fieldBlock + '})')
            item.blurb = ''
            index.push(item.slug)

            const jsonItem = JSON.stringify(item)
            writeFileSync(join(destDir, item.slug + '.json'), jsonItem)
          }

          catch(err) {
            console.error('Could not convert ' + itemVarName + '.', err)
          }
        }
      }
    }

    writeFileSync(join(destDir, 'index.json'), JSON.stringify(index))

    const staticSrcDir = join(__dirname, '..', '..', '..', 'static')
    const staticDestDir = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static')

    execSync(`rm -rf ${staticDestDir}`, { stdio: 'inherit' })
    execSync(`cp -rf ${staticSrcDir} ${staticDestDir}`, { stdio: 'inherit' })
    setConverting(false)
  }, [])

  return (
    <div className="admin-convert">
      { converting ? 'Converting...' : 'Done.'}
    </div>
  )
}

export default AdminConvert
