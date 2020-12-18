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
import { IPlaylist } from '../../../../../lib/modules/website-player'

function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const newItems: IContentItem[] = []

  const artists = [
    'Adam Overton',
    'Alex Black Ivory',
    'André Cormier',
    'Annelyse Gelman',
    'Antoine Beuger',
    'Ariel Pink',
    'Babooshka',
    'Black Powder',
    'Bruegel',
    'Bubonic Plague',
    'Casey Anderson',
    'Cassia Streb',
    'Catherine Lamb',
    'Christian Wolff',
    'Common Graybird',
    'Craig Shepard',
    'Double Penetration',
    'Douglas Wadle',
    'Ekkehard Ehlers',
    'Elisabeth McMullin',
    'Eric KM Clark',
    'Garbaej Katz',
    'Geneva Jacuzzi',
    'Heather Lockie',
    'Immaculate Conception',
    'India Cooke',
    'Ivan Gomez',
    'James Klopfleisch',
    'James Tenney',
    'Jason Brogan',
    'Jason Grier',
    'Jean-Luc Guionnet',
    'Jeepneys',
    'Jennie Gottschalk',
    'Jessica Catron',
    'Joe Lake',
    'John Cage',
    'John Lely',
    'John Maus',
    'John P. Hastings',
    'Jonathan Marmour',
    'Joseph Kudirka',
    'Julia Holter',
    'Juniper Foam',
    'Jürg Frey',
    'Kevin Drumm',
    'Klaus Lang',
    'Laena Geronimo',
    'Laura Steenberge',
    'Laurel Halo',
    'Laurence Crane',
    'Linda Perhacs',
    'Lucrecia Dalt',
    'Manfred Werder',
    'Mari',
    'Maria Minerva',
    'Mark So',
    'Matt Fishbeck',
    'Michael Pisaro',
    'Michael Winter',
    'Morton Feldman',
    'Muscle Drum',
    'Nite Jewel',
    'Obelisk',
    'Paul Arámbula',
    'Preemo',
    'Raw Geronimo',
    'Ry Rock',
    'Sam Sfirri',
    'Samuel Vriezen',
    'Softboiled Eggies',
    'Spider Babies',
    'Stellar Om Source',
    'Taku Unami',
    'Taylan Susam',
    'The Dowry',
    'The Remarkable Thing About Swans',
    'The Seasonings',
    'Ulrich Krieger',
    'Vibe Central',
    'Weave',
    'William Basinski',
    'Wolfgang von Schweinitz',
  ]

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)
    newItems.push(newItem)
  }

  for (const artistName of artists) {
    const artistItem = modelize({
      id: uuid(),
      title: artistName,
      slug: slugify(artistName),
      category: 'artists',
      date: 'January 2021',
      published: true,
      attachments: allContentItems
        .filter(item => item.attribution.includes(artistName))
        .map(item => item.id)
        .join('\n')
    })

    const firstTrack = getContentItemById(
      allContentItems,
      artistItem.attachments.split('\n')[0]
    )

    if (firstTrack) {
      artistItem.keyArt = firstTrack.keyArt
    }

    newItems.push(artistItem)
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
