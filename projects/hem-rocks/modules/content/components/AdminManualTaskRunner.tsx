import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import { uniq, noop, last, isNumber, compact, uniqBy, has, sample, filter, map, find, isEmpty, includes, sortBy, partial, findIndex, flatten } from 'lodash'
import pad from 'pad'
import moment from 'moment'
import $ from 'jquery'
import { autoParagraph } from '../../../../../lib/functions'
import { modelize, hasTag, getContentItemById, hasCategory, getContentItemsFromList, getContentItemsFromRawList, getContentItemBySlug } from '../functions'
import { IIndexEntry, IContentItem, compressIndex, requestReadItems } from '..'
import { RootState } from '../../../index'
import { slugify, titleCase } from 'voca'
import { execSync } from 'child_process'
import { all } from 'redux-saga/effects'
import { formatTime } from '../../../../../lib/modules/website-player'
import { serverFiles, localFiles } from '../deploy-files'
import { curatedPlaylists } from '../../app'

function bakeIn(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const terms = [
    'home-features',
    'sound-library',
    'tracks',
    'playlists',
    'artists',
    'articles',
    'editions',
    'todos',
    'label',
    'tutorials',
    'newsletters',
    'apps',
    'recipes',
    'videos',
    'press-releases',
    'press-clippings',
    {
      name: 'curated-playlists',
      getContentItems(allContentItems) {
        this.contentItems = this.contentItems.concat(flatten(curatedPlaylists.map(({ name }) => {
          const slug = slugify(name)
          const listItem = getContentItemBySlug(allContentItems, slug)
          const attachments = getContentItemsFromList(allContentItems, slug)

          return [listItem].concat(attachments)
        })))
      },
      contentItems: [],
    },
  ]

  const chunks = terms.map(term =>
    typeof term === 'object' ? term : ({
      name: term,
      getContentItems: null,
      contentItems: [],
    })
  )

  for (const chunk of chunks) {
    if (typeof chunk.getContentItems === 'function') {
      chunk.getContentItems(allContentItems)
    }

    else {
      for (const oldItem of allContentItems) {
        const newItem = Object.assign({}, oldItem)
        if (hasCategory(newItem, chunk.name)) {
          chunk.contentItems.push(newItem)
        }
      }
    }
  }

  console.log(chunks.map(term => term.name + ': ' + term.contentItems.length))

  for (const chunk of chunks) {
    const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', chunk.name + '.json')
    const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', chunk.name + '.json')
    writeFileSync(srcIndex, JSON.stringify(compressIndex(chunk.contentItems)))
    writeFileSync(distIndex, JSON.stringify(compressIndex(chunk.contentItems)))
  }
}

function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const newItems: IContentItem[] = []

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)
    newItems.push(newItem)
  }

  const allFiles = serverFiles.concat(localFiles)
  const allFilesImm = uniq(Array.from(allFiles))

  const srcDir = '/Users/jason/Desktop/Workingkong/HEM/Website/hem-static/hem-rocks/content/tracks/'
  const destDir = '/Volumes/April_Kepner/TMP/deploy/'

  for (const file of localFiles) {
    if (!serverFiles.includes(file)) {
      copyFileSync(join(srcDir, file), join(destDir, file))
    }
  }

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
  // writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  // writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
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
      runTask(() => bakeIn(allContentItems))
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
              Run Task
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
