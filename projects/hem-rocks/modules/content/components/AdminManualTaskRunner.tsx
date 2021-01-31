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

function chunkData(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const terms = [
    'apps',
    'articles',
    'artists',
    'editions',
    'label',
    'newsletters',
    'playlists',
    'press-clippings',
    'program',
    'recipes',
    'site-texts',
    'sound-library',
    'todos',
    'tracks',
    'tutorials',
    'videos',
    {
      name: 'curated-playlists',
      getContentItems(allContentItems: any) {
        this.contentItems = this.contentItems.concat(flatten((curatedPlaylists as any).map(({ name }: any) => {
          const slug = slugify(name)
          const listItem = getContentItemBySlug(allContentItems, slug)
          const attachments = getContentItemsFromList(allContentItems, slug)

          return [listItem].concat(attachments)
        })))
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'home-features',
      getContentItems(allContentItems: any) {
        const homeFeaturesItems = allContentItems.filter((item: any) => hasCategory(item, 'home-features'))
        const homeHeroineItem = getContentItemBySlug(allContentItems, 'new-website')

        this.contentItems = homeFeaturesItems.concat(homeHeroineItem)
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'press-releases',
      getContentItems(allContentItems: any) {
        const pressReleaseItems = allContentItems.filter((item: any) => hasCategory(item, 'press-releases'))
        const attachedPlaylists = compact(pressReleaseItems.map((item: IContentItem) => getContentItemById(allContentItems, item.attachments)))

        this.contentItems = pressReleaseItems.concat(attachedPlaylists)
      },
      contentItems: [] as IContentItem[],
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
          // @ts-ignore
          chunk.contentItems.push(newItem)
        }
      }
    }
  }

  for (const chunk of chunks) {
    const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', chunk.name + '.json')
    const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', chunk.name + '.json')

    // ***** DANGER ZONE *****
    // ***** DANGER ZONE *****
    // ***** DANGER ZONE *****

    writeFileSync(srcIndex, JSON.stringify(compressIndex(chunk.contentItems)))
    writeFileSync(distIndex, JSON.stringify(compressIndex(chunk.contentItems)))
  }
}

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

  const slugs: string[] = []

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    if (slugs.includes(newItem.slug)) {
      newItem.slug = newItem.slug + '-2'
    }

    slugs.push(newItem.slug)

    newItems.push(newItem)
  }

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
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

  const chunkOnClick = useCallback(
    function chunkOnClickFn() {
      runTask(() => chunkData(allContentItems))
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
              onClick={createOnClick}
            >
              Create from array
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={chunkOnClick}
            >
              Generate data chunks
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
