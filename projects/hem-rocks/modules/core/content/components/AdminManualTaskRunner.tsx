import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import moment from 'moment'
import { modelize, hasCategory, generateChunks } from '../functions'
import { IContentItem, requestReadItems, compressIndex } from '../index'
import { RootState } from '../../../../index'
import { slugify, titleCase } from 'voca'

async function createItemsFromFiles(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')
  const pdfParse = require('pdf-parse')

  const newItems: IContentItem[] = []

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)
    newItems.push(newItem)
  }

  const srcDir = '/Volumes/April_Kepner/TMP/releases-processed/'
  const srcFiles = readdirSync(srcDir)

  for (const fileName of srcFiles) {
    if (!fileName.includes('.DS_')) {
      const fileNameNoExt = fileName.split('.')[0]
      let [release, artist, date, version] = fileNameNoExt.split('--')

      release = titleCase(release.replace(/-/g, ' '))
      artist = titleCase(artist.replace(/-/g, ' '))
      date = moment(date).format('MMMM YYYY')

      const description = readFileSync(join(srcDir, fileName), 'utf8')
      const slug = slugify(release + '-' + artist) + '-press-release'
      const attachedPlaylist = allContentItems.find(item => item.attribution === artist)

      newItems.push(modelize({
        id: uuid(),
        title: release + ' Press Release',
        secondaryTitle: artist,
        attribution: 'Jason Grier',
        date,
        published: true,
        description,
        keyArt: slug + '.jpg',
        category: 'press-releases',
        attachments: attachedPlaylist ? attachedPlaylist.id : '',
        slug,
      } as Partial<IContentItem>))
    }
  }

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  // writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  // writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
}

function createItemsFromArray(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')
  const pdfParse = require('pdf-parse')

  const newItems: IContentItem[] = []

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)
    newItems.push(newItem)
  }

  const audioFilenames: string[] = [
    'first-bird-line-goettsche.mp3',
    'june-line-goettsche.mp3',
    'september-line-goettsche.mp3',
  ]

  for (const audioFilename of audioFilenames) {
    // @ts-ignore
    const title = titleCase(audioFilename.split('-line-goettsche')[0].replace(/-/g, ' '))
    const buff = readFileSync('/Users/jason/Desktop/Workingkong/HEM/Website/hem-static/hem-rocks/content/tracks/' + audioFilename)
    const duration = moment(getMP3Duration(buff)).format('m:ss')
    const createdItem = modelize({
      id: uuid(),
      tags: 'rare, featured',
      title,
      attribution: 'Line Gøttsche',
      secondaryAttribution: '',
      date: 'February 2021',
      published: true,
      keyArt: 'line-goettsche.jpg',
      category: 'tracks',
      displayCategory: 'Tracks',
      slug: audioFilename.replace('.mp3', ''),
      duration,
      audioFilename,
    } as Partial<IContentItem>)

    newItems.push(createdItem)
  }

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  // writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  // writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
}

async function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')
  const pdfParse = require('pdf-parse')

  const newItems: IContentItem[] = []

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    if (newItem.slug.includes('-jag')) {
      console.log(newItem.title)
    }

    newItems.push(newItem)
  }

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  // writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  // writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
  // generateChunks(allContentItems)
}

function AdminManualTaskRunner(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const [running, setRunning] = useState(0)

  useEffect(function fetchItems() {
    dispatch(requestReadItems())
  }, [])

  const migrateOnClick = useCallback(
    function migrateOnClickFn() {
      runTask(() => migrate(allContentItems))
    }, [allContentItems],
  )

  const generateChunksOnClick = useCallback(
    function migrateOnClickFn() {
      runTask(() => generateChunks(allContentItems))
    }, [allContentItems],
  )

  const createOnClick = useCallback(
    function createOnClickFn() {
      runTask(() => createItemsFromArray(allContentItems))
    }, [allContentItems],
  )

  const resetOnClick = useCallback(
    function resetOnClickFn() {
      setRunning(0)
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
              onClick={migrateOnClick}
            >
              Run migration task
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={generateChunksOnClick}
            >
              Generate Chunks
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={createOnClick}
            >
              Create from array
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
