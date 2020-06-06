import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import uuid from 'uuid/v1'
import { slugify } from 'voca'
import { autoParagraph } from '../../../../../lib/functions'
import { modelize } from '../functions'
import { IIndexEntry } from '..'

function convertOldTypescriptModelsToJson() {
  const { remote } = window.require('electron')
  const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
  const { extname, join } = remote.require('path')
  const { execSync } = remote.require('child_process')

  // @ts-ignore
  window.autop = autoParagraph
  // @ts-ignore
  window.uuid = uuid

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
          let item = eval('({' + fieldBlock + '})')
          item.blurb = ''
          item = modelize(item)
          index.push({ slug: item.slug, date: item.date })

          const jsonItem = JSON.stringify(item, null, 2)
          writeFileSync(join(destDir, item.slug + '.json'), jsonItem)
        }

        catch(err) {
          console.error('Could not convert ' + itemVarName + '.', err)
        }
      }
    }
  }

  writeFileSync(join(destDir, 'index.json'), JSON.stringify(index, null, 2))

  const staticSrcDir = join(__dirname, '..', '..', '..', 'static')
  const staticDestDir = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static')

  execSync(`rm -rf ${staticDestDir}`, { stdio: 'inherit' })
  execSync(`cp -rf ${staticSrcDir} ${staticDestDir}`, { stdio: 'inherit' })
}

function soundLibrarySampleTrack(soundTitle: string, soundSlug: string, number: number, date: string = '09.01.2017') {
  const title = soundTitle + ' Sample Track ' + number
  return {
    title,
    slug: slugify(title),
    category: 'tracks',
    tags: 'attachment',
    attribution: 'HEM Sound Library',
    attributionLink: '/sound-library',
    date,
    relatedContent: soundSlug,
    relatedContentLink: '/sound-library/' + soundSlug,
  }
}

function migrate() {
  const { remote } = window.require('electron')
  const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
  const { extname, join } = remote.require('path')
  const { execSync } = remote.require('child_process')

  const contentDir = join(__dirname, '..', '..', '..', 'static', 'content')
  const workingDir = join(__dirname, '..', '..', '..', 'static', 'content-working')
  const contentDistDir = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content')

  if (existsSync(workingDir)) {
    execSync(`rm -rf ${workingDir}`)
  }

  execSync(`mkdir ${workingDir}`)

  const index = []

  const files = readdirSync(contentDir)

  let count = 1
  for (const file of files) {
    if (file === 'index.json') continue
    if (extname(file) !== '.json') continue

    const data = JSON.parse(readFileSync(`${contentDir}/${file}`, 'utf8'))
    const parentItem = modelize(data)

    if (!parentItem.trackSlug) {
      parentItem.trackSlug = slugify(soundLibrarySampleTrack(parentItem.title, parentItem.slug, 1, parentItem.date).slug)
    }

    index.push(parentItem)

    if (data.slug === 'grand-piano') continue

    try {
      // DO STUFF HERE

      if (parentItem.category === 'sound-library') {
        for (let i = 1; i <= 5; i ++) {
          const item = modelize(soundLibrarySampleTrack(parentItem.title, parentItem.slug, i, parentItem.date))

          index.push(item)

          const jsonItem = JSON.stringify(item, null, 2)

          writeFileSync(join(workingDir, slugify(item.title) + '.json'), jsonItem)
        }
      }

      // END DO STUFF HERE
    }

    catch(err) {
      console.error('Could not convert ' + file + '.', err)
    }
  }

  writeFileSync(join(workingDir, 'index.json'), JSON.stringify(index, null, 2))

  execSync(`rm -rf ${contentDir}`, { stdio: 'inherit' })
  execSync(`mv ${workingDir} ${contentDir}`, { stdio: 'inherit' })

  execSync(`rm -rf ${contentDistDir}`, { stdio: 'inherit' })
  execSync(`cp -rf ${contentDir} ${contentDistDir}`, { stdio: 'inherit' })
}

function assignImages() {
  const { remote } = window.require('electron')
  const { readdirSync, readFileSync } = remote.require('fs')
  const { extname, join } = remote.require('path')
  const { execSync } = remote.require('child_process')

  const contentDir = join(__dirname, '..', '..', '..', 'static', 'content')
  const imagesDir = join(__dirname, '..', '..', '..', 'static', 'assets', 'images', 'key-art')
  const imagesDistDir = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'assets', 'images', 'key-art')
  const contentFiles = readdirSync(contentDir)
  const images = readdirSync(imagesDir)

  const soundLibraryFileNames = contentFiles.reduce((acc: string[], fileName: string) => {
    if (fileName === 'index.json') return acc
    if (extname(fileName) !== '.json') return acc

    const filePath = `${contentDir}/${fileName}`
    const data = JSON.parse(readFileSync(filePath, 'utf8'))

    if (data.tags && data.tags.includes('sound-library')) {
      acc.push(fileName)
    }

    return acc
  }, [])

  for (var i = 0; i < soundLibraryFileNames.length; i ++) {
    const fileName = soundLibraryFileNames[i]

    if (fileName === 'index.json') continue
    if (extname(fileName) !== '.json') continue

    execSync(`mv ${imagesDir}/${images[i]} ${imagesDir}/${fileName.replace('.json', '.jpg')}`)
  }

  execSync(`rm -rf ${imagesDistDir}`, { stdio: 'inherit' })
  execSync(`cp -rf ${imagesDir} ${imagesDistDir}`, { stdio: 'inherit' })
}

function AdminManualTaskRunner(): ReactElement {
  const [running, setRunning] = useState(0)

  const resetModelsOnClick = useCallback(
    function resetOnClickFn() {
      const confirmation = confirm('This will RUIN everything. make sure you have content backed up someplace, or committed to source control.')
      if (!confirmation) return
      runTask(convertOldTypescriptModelsToJson)
    }, [],
  )

  const migrateOnClick = useCallback(
    function migrateOnClickFn() {
      runTask(migrate)
    }, [],
  )

  const resetOnClick = useCallback(
    function resetOnClickFn() {
      setRunning(0)
    }, [],
  )

  const assignImagesOnClick = useCallback(
    function assignImagesOnClickFn() {
      runTask(assignImages)
    }, [],
  )

  function runTask(taskFn: Function) {
    setRunning(1)
    setTimeout(() => {
      taskFn()
      setRunning(2)
    }, 1000)
  }

  return (
    <div className="admin-manual-task-runner">
      { running === 0 && (
        <ul>
          <li>
            <a
              href="#"
              onClick={resetModelsOnClick}
            >
              Return to old Typescript seed models
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={migrateOnClick}
            >
              Migrate
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={assignImagesOnClick}
            >
              Assign Images
            </a>
          </li>
        </ul>
      )}
      { running === 1 && (
        <div>Running...</div>
      )}
      { running === 2 && (
        <>
          <div>Done!</div>
          <div>
            <a
              href="#"
              onClick={resetOnClick}
            >
              Run another task...
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminManualTaskRunner
