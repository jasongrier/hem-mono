import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import moment from 'moment'
import { modelize, hasCategory, generateChunks, removeTag, addProperty, hasTag } from '../functions'
import { IContentItem, requestReadItems, compressIndex, addTag } from '../index'
import { RootState } from '../../../../index'
import { slugify, titleCase } from 'voca'
import { intersection, isEmpty } from 'lodash'

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

  const filenames: string[] = [
    'Sky-17.12.2020.gif',
    'Untitled-21.12.2020.gif',
    'Train-13.12.2020.gif',
    'thumbnails',
    'Sunrise-21.02.2020.gif',
    'Sunrise-21.02.2020 2.gif',
    'Sunrise-15.02.2020.gif',
    'Snow-12.01.2021.gif',
    'Sky-26.02.2021.gif',
    'Sky-20.12.2020.gif',
    'Sky-19.12.2020.gif',
    'Sky-18.12.2020.gif',
    'Sky-16.12.2020.gif',
    'Sky-15.12.2020.gif',
    'Sky-15.12.2020-2.gif',
    'Sky-14.12.2020.gif',
    'Sky-12.12.2020.gif',
    'Sky-9.12.2020.gif',
    'Sky-8.12.2020.gif',
    'Sky-7.12.2020.gif',
    'Sky-4.12.2020.gif',
    'Self-13.12.2020.gif',
    'Salad.gif',
    'Raindrops-26.02.2021.gif',
    'Raindrops-22.12.2020.gif',
    'Park-13.12.2020.gif',
    'Park-12.12.2020-2.gif',
    'Park-11.12.2020.gif',
    'Oranges.gif',
    'Moon-28.12.2020.gif',
    'Moon-26.12.2021.gif',
    'Keyboard.gif',
    'Fog-10.12.2020.gif',
    'Fireworks.gif',
    'Fernsehturn-19.02.2020.gif',
    'Fernsehturn-19.02.2020 2.gif',
    'Clouds-27.02.2021.gif',
    'Cauliflower.gif',
    'Candle-21.12.2020.gif',
    'Candle-18.12.2020.gif',
    'Candle-15.12.2020.gif',
    'Candle-13.12.2020.gif',
    'Candle-11.20.2020.gif',
    'Candle-10.12.2020.gif',
    'Birds-23.12.2020.gif',
    'Bird-03.01.2021.gif',
  ]

  for (const filename of filenames) {
    // @ts-ignore
    const title = titleCase(filename)
    const createdItem = modelize({
      id: uuid(),
      tags: 'animations',
      project: 'jag.rip',
      title,
      attribution: '',
      secondaryAttribution: '',
      date: 'February 2021',
      published: true,
      keyArtFullPath: 'content/images/galleries/animations/' + filename,
      category: 'images',
      displayCategory: '',
      slug: filename + '-jag',
    } as Partial<IContentItem>)

    newItems.push(createdItem)
  }

  const srcIndex = join(__dirname, '..', '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

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

    if (hasCategory(newItem, 'program')) {
      if (newItem.title.includes('Adee')) {
        newItem.project = 'hem.rocks'
      }

      else if (isEmpty(newItem.title)) {
        newItem.published = false
      }
    }

    newItems.push(newItem)
  }

  const srcIndex = join(__dirname, '..', '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  // writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  // writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
  // generateChunks(newItems)
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
