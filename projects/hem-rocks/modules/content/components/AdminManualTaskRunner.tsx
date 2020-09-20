import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import { uniq, noop, last, compact, has, sample, filter, map, find, isEmpty, includes } from 'lodash'
import pad from 'pad'
import moment from 'moment'
import $ from 'jquery'
import { autoParagraph } from '../../../../../lib/functions'
import { modelize, hasTag, getContentItemBySlug, hasCategory } from '../functions'
import { IIndexEntry, IContentItem, compressIndex } from '..'
import { RootState } from '../../../index'
import { readdirSync, renameSync } from 'fs'
import { slugify, titleCase } from 'voca'
import { execSync } from 'child_process'

function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync } = remote.require('fs')
  const { join, extname } = remote.require('path')

  const newItems = []

  const tracks = [
    'on-and-on-destroyed-ambient-jason-grier',
    'audio-new-edit-1-track-1-24-jul-2006-various-artists',
    '08-the-body-is-the-bread-various-artists',
    'why-do-we-duette-various-artists',
    'the-weird-wolf-various-artists',
    '13-one-true-comfort-various-artists',
    'calling-human-ear-music-ivan-gomez',
    '01-neighbor-neighbor-various-artists',
    'from-left-to-right-various-artists',
    '24-24-it-s-just-begun-various-artists',
    '01-barnoon-hill-various-artists',
    'hor-ich-das-liedchenmix-2-various-artists',
    'manuscript-1-edit-various-artists',
    'slavic-various-artists',
    'ncprehearsal-1-various-artists',
    'fire-first-mountain-various-artists',
    'mt-various-artists',
    'brothers-and-sisters-of-the-gun-demo-various-artists',
    'christmas-plate-noverb-various-artists',
    'dominos-various-artists',
    '09-darby-s-revenge-various-artists',
    '01-man-he-can-1-various-artists',
    '01-ocean-farm-1-various-artists',
    '02-strong-wait-various-artists',
    'too-fucking-fun-various-artists',
    'falling-out-of-love-various-artists',
    'i-m-not-insane-various-artists',
    '02-unearth-the-human-saxaphone-various-artists',
    'calling-human-ear-music-various-artists',
    'jason-grier-live-1-various-artists',
  ]

  for (const track of tracks) {
    // const newItem = Object.assign({}, oldItem)

    const item = getContentItemBySlug(allContentItems, track)
    if (item) {
      console.log(hasTag(item, 'rare-tracks'), item.slug)
    }

    else {
      console.log('uh oh!')
    }

    // newItems.push(newItem)
  }

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
  // writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  // writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
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
