import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import { uniq, noop, last, isNumber, compact, uniqBy, has, sample, filter, map, find, isEmpty, includes, sortBy, partial, findIndex, flatten } from 'lodash'
import pad from 'pad'
import moment from 'moment'
import $ from 'jquery'
import { autoParagraph } from '../../../../../lib/functions'
import { modelize, hasTag, getContentItemById, hasCategory, getContentItemsFromList, getContentItemsFromRawList } from '../functions'
import { IIndexEntry, IContentItem, compressIndex } from '..'
import { RootState } from '../../../index'
import { slugify, titleCase } from 'voca'
import { execSync } from 'child_process'
import { all } from 'redux-saga/effects'
import { formatTime } from '../../../../../lib/modules/website-player'

function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const newItems: IContentItem[] = []
  let attachments: string = ''
  const songs: string[] = [
    'Pebble from the Window.mp3',
    'Dot in a Music Notebook.mp3',
    'Little Papaya Moon.mp3',
    'Hole in Your Pocket.mp3',
    'Sweet Coffee Dreams.mp3',
    'Carmen Goes By Car Over the Bridge.mp3',
    'Sunflower Seed.mp3',
    'Tobiko & Ikura.mp3',
    'Balalaia.mp3',
    'Hole in a Danish Coin.mp3',
    'Kaffemalet.mp3',
    'Lentil Love Life (Beluga).mp3',
    'Lentil Love Life (Orange).mp3',
    'Watermelon Seed.mp3',
    'Couscous on a Blue Platter.mp3',
    'Bubble with a Shadow.mp3',
    'Road Song (A Lawrencian Footnote).mp3',
    'Margarita Advertisement #3.mp3',
    'Sunday, May 37th.mp3',
    'Running Light.mp3',
    'The Chanteusy Moon Mood.mp3',
    'Money.mp3',
    'After Portuguese.mp3',
    'Ornament 1.mp3',
    'Huddle Island (A Walking Tour).mp3',
    'Truly a Doodle.mp3',
    'Instru.mp3',
    'Margarita Advertisement #2.mp3',
    'The VElvetEst MOde.mp3',
    'The Rally.mp3',
    'Margarita Advertisement #1.mp3',
    'Lost Time.mp3',
    'Hoshi\'s Farm.mp3',
    'Candelabra.mp3',
    'Cygnets.mp3',
    'Sad Song.mp3',
    'Du Sommeil.mp3',
    'The S.S. Hope.mp3',
    'Odyssey.mp3',
    'Las Temporadas.mp3',
    'Adeline.mp3',
    'Pen Pal.mp3',
    'Don\'t Crack.mp3',
    'Wavelength.mp3',
    'Il Sentiero.mp3',
  ]

  const srcDir = '/Volumes/April_Kepner/TMP/doodles/'

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)
    newItems.push(newItem)
  }

  for (const song of songs) {
    const id = uuid()
    const slug = slugify(song.replace('.mp3', ''))
    const audioFileName = slug + '-jason-grier.mp3'
    const oPath = join(srcDir, song)
    const durationRaw = getMP3Duration(readFileSync(oPath))
    const duration = formatTime(parseInt(durationRaw, 10) / 1000).toString().replace(/^0/, '')

    copyFileSync(oPath, '/Users/jason/Desktop/Workingkong/HEM/Website/hem-static/hem-rocks/content/tracks/' + audioFileName)

    const createdItem = modelize({
      id,
      audioFileName,
      title: song.replace('.mp3', ''),
      slug,
      published: true,
      attribution: 'Jason Grier',
      category: 'tracks',
      date: 'January 2021',
      duration,
      keyArt: 'lockdown-doodles.jpg',
      releasePhase: '1',
    } as Partial<IContentItem>)

    newItems.push(createdItem)
    attachments = attachments + id + '\n'
  }

  const playlist = find(newItems, { title: 'Lockdown Doodles' })

  playlist.attachments = attachments

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
