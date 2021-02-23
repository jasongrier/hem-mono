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

  const filenames: string[] = [
    'Grier_MDelire_Feb14.jpg',
    'Arttforum.jpg',
    'Grier_Debug_Dec13.jpg',
    'Grier_ME_Nov17.jpg',
    'Grier_ME_Oct17.jpg',
    'Grier_Spex_Diederichsen_Jul14.jpg',
    'Grier_Spex_Jan14.jpg',
    'Grier_Spex_Nov17 (1).jpg',
    'Grier_Westzeit_Oct17.jpg',
    'LAIF_01_str_46_57_RECENZJE3.jpg',
    'MagicRPM.jpg',
    'Ableton.png',
    'BBC Radio 3 - Late Junction, Nick Luscombe with Björk.png',
    'Die Tageszeitung — Dez 2013.png',
    'Eine Frage des Inputs – amusio.png',
    'Grier_ChainDLK_Interview.png',
    'Grier_ChainDLK_Oct17.png',
    'Grier_DarkEntries_Apr18.png',
    'Grier_Dissolve_Nov13.png',
    'Grier_DlfKultur_Nov17.png',
    'Grier_FeltHat_Dec17.png',
    'Grier_HungerCulture_Dec13.png',
    'Grier_ME_Oct17.png',
    'Grier_MusicMap_Oct17.png',
    'Grier_Musikansich_Jan14.png',
    'Grier_NieuweNoten_Feb18.png',
    'Grier_NowaMuzyka_Nov17_UNBEKANNTE.png',
    'Grier_NowaMuzyka_Nov17_VS.png',
    'Grier_OndaRock_Jan14k.png',
    'Grier_Ondarock_Oct17.png',
    'Grier_Rifraf_Feb14.png',
    'Grier_taz_Dec13.png',
    'Grier_ToPeriodiko_Dec17.png',
    'Grier_TSP_May18.png',
    'Grier_W&H_Feb14.png',
    'Grier_Wire_Oct17.png',
    'Grier2_Spex_Dec13.png',
    'HEM_NowaMuzyka_Feb14.png',
    'HEM_Wire_Jan14.png',
    'Vital Weekly 914.rtf',
  ]

  for (const filename of filenames) {
    // @ts-ignore
    const title = titleCase(filename)
    const createdItem = modelize({
      id: uuid(),
      tags: 'press',
      project: 'jag.rip',
      title,
      attribution: 'Line Gøttsche',
      secondaryAttribution: '',
      date: 'February 2021',
      published: true,
      keyArt: filename,
      category: 'projects',
      displayCategory: 'Tracks',
      slug: filename + '-jag',
    } as Partial<IContentItem>)

    newItems.push(createdItem)
  }

  const srcIndex = join(__dirname, '..', '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
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

    if (
      hasCategory(newItem, 'tracks')
      && newItem.project === 'hem.rocks'
      && newItem.attribution.includes('Jason Grier')
      && newItem.published
    ) {
      const copiedItem = Object.assign({}, newItem)
      copiedItem.project = 'jag.rip'
      copiedItem.slug = copiedItem.slug + '-jag'

      newItems.push(copiedItem)
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
