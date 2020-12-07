import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import { uniq, noop, last, compact, uniqBy, has, sample, filter, map, find, isEmpty, includes, sortBy, partial } from 'lodash'
import pad from 'pad'
import moment from 'moment'
import $ from 'jquery'
import { autoParagraph } from '../../../../../lib/functions'
import { modelize, hasTag, getContentItemBySlug, hasCategory, getContentItemsFromList, getContentItemsFromRawList } from '../functions'
import { IIndexEntry, IContentItem, compressIndex } from '..'
import { RootState } from '../../../index'
import { slugify, titleCase } from 'voca'
import { execSync } from 'child_process'
import { all } from 'redux-saga/effects'
import { IPlaylist } from '../../../../../lib/modules/website-player'

function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const newItems: IContentItem[] = []

  // ***** CHECKSUM DUPLICATE SLUGS *****

  // const slugs = map(allContentItems, 'slug')
  // const uniqueSlugs = uniq(slugs)

  // console.log(slugs.length - uniqueSlugs.length)

  // ***** FIND A DUPLICATE SLUG *****

  // let found = false

  // for (const oldItem of allContentItems) {
  //   const newItem = Object.assign({}, oldItem)

  //   if (!found && newItem.slug === 'genetic-memory-jason-grier-1') {
  //     newItem.slug = 'genetic-memory-jason-grier-2'
  //     found = true
  //   }

  //   newItems.push(newItem)
  // }

  // ***** FIND ALL DUPLICATE SLUGS *****

  // const allSlugs = compact(allContentItems.map(item => item.published && item.slug))

  // const findingCache: string[] = []
  // const dupes: string[] = []

  // for (const slug of allSlugs) {
  //   if (findingCache.includes(slug)) {
  //     dupes.push(slug)
  //     console.log(slug)
  //   }

  //   else {
  //     findingCache.push(slug)
  //   }
  // }

  // const fixedDupes: string[] = []

  // for (const oldItem of allContentItems) {
  //   const newItem = Object.assign({}, oldItem)

  //   if (dupes.includes(newItem.slug) && !fixedDupes.includes(newItem.slug)) {
  //     fixedDupes.push(newItem.slug)
  //     newItem.slug = newItem.slug + '-1'
  //     newItem.tags = newItem.tags + ', dupe'
  //   }

  //   newItems.push(newItem)
  // }

  // console.log(fixedDupes.join("\n"))

  // ***** CHANGE/ADD ITEMS *****

  const tracks = [
    'intro-spider-babies',
    'we-re-just-tuning-up-spider-babies',
    'we-re-not-doing-a-song-by-the-beetles-spider-babies',
    'this-girl-spider-babies',
    'i-lived-in-mexico-city-spider-babies',
    'my-mic-spider-babies',
    'rule-number-one-spider-babies',
  ]

  const playlists = [
    {
      id: uuid(),
      name: 'Spider Babies',
      attachments: [
        'intro-spider-babies',
        'we-re-just-tuning-up-spider-babies',
        'we-re-not-doing-a-song-by-the-beetles-spider-babies',
        'this-girl-spider-babies',
        'i-lived-in-mexico-city-spider-babies',
        'my-mic-spider-babies',
        'rule-number-one-spider-babies',
      ],
    },
    {
      id: uuid(),
      name: 'Haunted: Frozen',
      attachments: [
        'haunted-frozen-1-jason-grier-and-ariel-pink',
        'haunted-frozen-2-jason-grier-and-ariel-pink',
        'haunted-frozen-3-jason-grier-and-ariel-pink',
        'haunted-frozen-4-jason-grier-and-ariel-pink',
        'haunted-frozen-5-jason-grier-and-ariel-pink',
        'haunted-frozen-6-jason-grier-and-ariel-pink',
        'haunted-frozen-7-jason-grier-and-ariel-pink',
        'haunted-frozen-8-jason-grier-and-ariel-pink',
        'haunted-frozen-9-jason-grier-and-ariel-pink',
      ],
    }
  ]

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    if (newItem.title === 'Home Page Features') {
      const attachments = map(getContentItemsFromRawList(allContentItems, newItem.description), 'id')
      newItem.attachments = attachments.join('\n')
      newItem.description = ''
    }

    newItems.push(newItem)
  }

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
  writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
}

function AdminManualTaskRunner(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const [running, setRunning] = useState(0)

  const migrateOnClick = useCallback(
    function migrateOnClickFn() {
      runTask(() => migrate(allContentItems))
    }, [],
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
