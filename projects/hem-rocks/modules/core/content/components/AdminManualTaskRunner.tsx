import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import moment from 'moment'
import { modelize, hasCategory, generateChunks, removeTag, addProperty, hasTag, getContentItemById } from '../functions'
import { IContentItem, requestReadItems, compressIndex, addTag } from '../index'
import { RootState } from '../../../../index'
import { slugify, titleCase } from 'voca'
import { filter, intersection, map, uniq } from 'lodash'

async function createItemsFromFiles(allContentItems: IContentItem[]) {
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

const releasesTracks = [
  '484b3ba2-3893-11eb-9b19-d773ba798561',
  '484b3ba3-3893-11eb-9b19-d773ba798561',
  '484b3ba4-3893-11eb-9b19-d773ba798561',
  '484b3ba5-3893-11eb-9b19-d773ba798561',
  '484b3ba6-3893-11eb-9b19-d773ba798561',
  '484b3ba7-3893-11eb-9b19-d773ba798561',
  '484b3ba8-3893-11eb-9b19-d773ba798561',
  '484b3ba9-3893-11eb-9b19-d773ba798561',
  '484b3b86-3893-11eb-9b19-d773ba798561',
  '484b3b87-3893-11eb-9b19-d773ba798561',
  '484b3b88-3893-11eb-9b19-d773ba798561',
  '484b3b89-3893-11eb-9b19-d773ba798561',
  '484b3b8a-3893-11eb-9b19-d773ba798561',
  '484b3b8b-3893-11eb-9b19-d773ba798561',
  '484b3b8c-3893-11eb-9b19-d773ba798561',
  '484b3b8d-3893-11eb-9b19-d773ba798561',
  '484b3b8e-3893-11eb-9b19-d773ba798561',
  '484b3b8f-3893-11eb-9b19-d773ba798561',
  '484b3b90-3893-11eb-9b19-d773ba798561',
  '484b3b91-3893-11eb-9b19-d773ba798561',
  '484b3b92-3893-11eb-9b19-d773ba798561',
  '484b3b93-3893-11eb-9b19-d773ba798561',
  '484b3b94-3893-11eb-9b19-d773ba798561',
  '484b3b95-3893-11eb-9b19-d773ba798561',
  '484b3b96-3893-11eb-9b19-d773ba798561',
  '484b3b97-3893-11eb-9b19-d773ba798561',
  '484a5159-3893-11eb-9b19-d773ba798561',
  '484a515a-3893-11eb-9b19-d773ba798561',
  '484b3bba-3893-11eb-9b19-d773ba798561',
  '484a515b-3893-11eb-9b19-d773ba798561',
  '484a515c-3893-11eb-9b19-d773ba798561',
  '484a515d-3893-11eb-9b19-d773ba798561',
  '484a7839-3893-11eb-9b19-d773ba798561',
  '484a7840-3893-11eb-9b19-d773ba798561',
  '484a7841-3893-11eb-9b19-d773ba798561',
  '484a7842-3893-11eb-9b19-d773ba798561',
  '484a9f4f-3893-11eb-9b19-d773ba798561',
  '484a9f50-3893-11eb-9b19-d773ba798561',
  '484a9f51-3893-11eb-9b19-d773ba798561',
  '484a9f53-3893-11eb-9b19-d773ba798561',
  '484a9f54-3893-11eb-9b19-d773ba798561',
  '484a9f55-3893-11eb-9b19-d773ba798561',
  '484a7884-3893-11eb-9b19-d773ba798561',
  '484a7885-3893-11eb-9b19-d773ba798561',
  '484a7886-3893-11eb-9b19-d773ba798561',
  '484a7887-3893-11eb-9b19-d773ba798561',
  '484a7888-3893-11eb-9b19-d773ba798561',
  '484a7889-3893-11eb-9b19-d773ba798561',
  '484a78b0-3893-11eb-9b19-d773ba798561',
  '484a9f10-3893-11eb-9b19-d773ba798561',
  '484a9f11-3893-11eb-9b19-d773ba798561',
  '484a9f12-3893-11eb-9b19-d773ba798561',
  '484a9f13-3893-11eb-9b19-d773ba798561',
  '484a9f14-3893-11eb-9b19-d773ba798561',
  '484a9f15-3893-11eb-9b19-d773ba798561',
  '484a9f16-3893-11eb-9b19-d773ba798561',
  '484a9f17-3893-11eb-9b19-d773ba798561',
  '484a9f18-3893-11eb-9b19-d773ba798561',
  '484a9f19-3893-11eb-9b19-d773ba798561',
  '484a9f1a-3893-11eb-9b19-d773ba798561',
  '484a9f1b-3893-11eb-9b19-d773ba798561',
  '484a9f1c-3893-11eb-9b19-d773ba798561',
  '484a9f42-3893-11eb-9b19-d773ba798561',
  '484a9f43-3893-11eb-9b19-d773ba798561',
  '484a9f44-3893-11eb-9b19-d773ba798561',
  '484a9f45-3893-11eb-9b19-d773ba798561',
  '484a9f46-3893-11eb-9b19-d773ba798561',
  '484a9f47-3893-11eb-9b19-d773ba798561',
  '484a9f48-3893-11eb-9b19-d773ba798561',
  '484a9f49-3893-11eb-9b19-d773ba798561',
  '484a9f4a-3893-11eb-9b19-d773ba798561',
  '484b3b84-3893-11eb-9b19-d773ba798561',
  '484b3b85-3893-11eb-9b19-d773ba798561',
  '484b3baa-3893-11eb-9b19-d773ba798561',
  '484b3bab-3893-11eb-9b19-d773ba798561',
  '484b3bac-3893-11eb-9b19-d773ba798561',
  '484b3bad-3893-11eb-9b19-d773ba798561',
  '484b3bae-3893-11eb-9b19-d773ba798561',
  '484b3baf-3893-11eb-9b19-d773ba798561',
  '484b3bb0-3893-11eb-9b19-d773ba798561',
  '484b3bb1-3893-11eb-9b19-d773ba798561',
  '484b3bb2-3893-11eb-9b19-d773ba798561',
  '484b3bb3-3893-11eb-9b19-d773ba798561',
  '484b3bb4-3893-11eb-9b19-d773ba798561',
  '484b3bb5-3893-11eb-9b19-d773ba798561',
  '484b3bb6-3893-11eb-9b19-d773ba798561',
  '484b3bb7-3893-11eb-9b19-d773ba798561',
  '484b6261-3893-11eb-9b19-d773ba798561',
  '484b3bb8-3893-11eb-9b19-d773ba798561',
  '484b3b5d-3893-11eb-9b19-d773ba798561',
  '484b3b5e-3893-11eb-9b19-d773ba798561',
  '484b3b5f-3893-11eb-9b19-d773ba798561',
  '484b3b60-3893-11eb-9b19-d773ba798561',
  '484b3b61-3893-11eb-9b19-d773ba798561',
  '484b3b62-3893-11eb-9b19-d773ba798561',
  '484b3b64-3893-11eb-9b19-d773ba798561',
  '484b3b65-3893-11eb-9b19-d773ba798561',
  '484b3b66-3893-11eb-9b19-d773ba798561',
  '484b3b69-3893-11eb-9b19-d773ba798561',
  '43c1eda0-4931-11eb-84a5-09abad4f8821',
  '43bbac10-4931-11eb-84a5-09abad4f8821',
  '43b6a300-4931-11eb-84a5-09abad4f8821',
  '43c4acc0-4931-11eb-84a5-09abad4f8821',
  '43ad5430-4931-11eb-84a5-09abad4f8821',
  '0def5f80-49e2-11eb-98b8-9fc68d7fc904',
  'e4045a60-75cb-4352-930d-d8153c4a2427',
  '0dfa34f0-49e2-11eb-98b8-9fc68d7fc904',
  '0df700a0-49e2-11eb-98b8-9fc68d7fc904',
  '0dfc09b0-49e2-11eb-98b8-9fc68d7fc904',
  '0e03d1e0-49e2-11eb-98b8-9fc68d7fc904',
  '0e049530-49e2-11eb-98b8-9fc68d7fc904',
  '0e061bd0-49e2-11eb-98b8-9fc68d7fc904',
  '0e0ece60-49e2-11eb-98b8-9fc68d7fc904',
  '0df33010-49e2-11eb-98b8-9fc68d7fc904',
  '0e08daf0-49e2-11eb-98b8-9fc68d7fc904',
  '0e0b4bf0-49e2-11eb-98b8-9fc68d7fc904',
  '484a9f90-3893-11eb-9b19-d773ba798561',
  '484a9f91-3893-11eb-9b19-d773ba798561',
  '484ac620-3893-11eb-9b19-d773ba798561',
  '484ac621-3893-11eb-9b19-d773ba798561',
  '484ac622-3893-11eb-9b19-d773ba798561',
  '484ac623-3893-11eb-9b19-d773ba798561',
  '484ac624-3893-11eb-9b19-d773ba798561',
  '484ac625-3893-11eb-9b19-d773ba798561',
  '484ac626-3893-11eb-9b19-d773ba798561',
  '484ac627-3893-11eb-9b19-d773ba798561',
  '484ac628-3893-11eb-9b19-d773ba798561',
  '484a9f61-3893-11eb-9b19-d773ba798561',
  '484a9f62-3893-11eb-9b19-d773ba798561',
  '484a9f63-3893-11eb-9b19-d773ba798561',
  '484a9f64-3893-11eb-9b19-d773ba798561',
  '484a9f65-3893-11eb-9b19-d773ba798561',
  '484a9f66-3893-11eb-9b19-d773ba798561',
  '484a9f67-3893-11eb-9b19-d773ba798561',
  '484a9f68-3893-11eb-9b19-d773ba798561',
  '484a9f69-3893-11eb-9b19-d773ba798561',
  '484a29e2-3893-11eb-9b19-d773ba798561',
  '484a29e3-3893-11eb-9b19-d773ba798561',
  '484a29e4-3893-11eb-9b19-d773ba798561',
  '484a29e5-3893-11eb-9b19-d773ba798561',
  '484a29e6-3893-11eb-9b19-d773ba798561',
  '484a29e7-3893-11eb-9b19-d773ba798561',
  '484a29e8-3893-11eb-9b19-d773ba798561',
  '484a29e9-3893-11eb-9b19-d773ba798561',
  '484a514d-3893-11eb-9b19-d773ba798561',
  '484a5149-3893-11eb-9b19-d773ba798561',
  '484a514b-3893-11eb-9b19-d773ba798561',
  '484b1486-3893-11eb-9b19-d773ba798561',
  '484a5148-3893-11eb-9b19-d773ba798561',
  '484b1487-3893-11eb-9b19-d773ba798561',
  '484a514f-3893-11eb-9b19-d773ba798561',
  '484a514e-3893-11eb-9b19-d773ba798561',
  '484a514c-3893-11eb-9b19-d773ba798561',
  '484a514a-3893-11eb-9b19-d773ba798561',
  '484ac62a-3893-11eb-9b19-d773ba798561',
  '484ac62b-3893-11eb-9b19-d773ba798561',
  '484ac62c-3893-11eb-9b19-d773ba798561',
  '484ac62d-3893-11eb-9b19-d773ba798561',
  '484b3b5d-3893-11eb-9b19-d773ba798561',
  '484ac62f-3893-11eb-9b19-d773ba798561',
  '484ac631-3893-11eb-9b19-d773ba798561',
  '484ac630-3893-11eb-9b19-d773ba798561',
  '484ac631-3893-11eb-9b19-d773ba798561',
  '484b3b98-3893-11eb-9b19-d773ba798561',
  '484b3b99-3893-11eb-9b19-d773ba798561',
  '484b3b9a-3893-11eb-9b19-d773ba798561',
  '484b3b9b-3893-11eb-9b19-d773ba798561',
  '484b3b9c-3893-11eb-9b19-d773ba798561',
  '484b3b9d-3893-11eb-9b19-d773ba798561',
  '484b3b9e-3893-11eb-9b19-d773ba798561',
  '484b3b9f-3893-11eb-9b19-d773ba798561',
  '484b3ba0-3893-11eb-9b19-d773ba798561',
  '484b3ba1-3893-11eb-9b19-d773ba798561',
  '484a783c-3893-11eb-9b19-d773ba798561',
  '484a9f57-3893-11eb-9b19-d773ba798561',
  '484a783d-3893-11eb-9b19-d773ba798561',
  '484a9f59-3893-11eb-9b19-d773ba798561',
  '484a783e-3893-11eb-9b19-d773ba798561',
  '484a783f-3893-11eb-9b19-d773ba798561',
  '484a9f5c-3893-11eb-9b19-d773ba798561',
  '484a9f5d-3893-11eb-9b19-d773ba798561',
  '484a7845-3893-11eb-9b19-d773ba798561',
  '484a7846-3893-11eb-9b19-d773ba798561',
  '484a7847-3893-11eb-9b19-d773ba798561',
  '484a7848-3893-11eb-9b19-d773ba798561',
  '484a7849-3893-11eb-9b19-d773ba798561',
  '484a784a-3893-11eb-9b19-d773ba798561',
  '484a784b-3893-11eb-9b19-d773ba798561',
  '484a784c-3893-11eb-9b19-d773ba798561',
  '484a784d-3893-11eb-9b19-d773ba798561',
  '484a784e-3893-11eb-9b19-d773ba798561',
  '484a784f-3893-11eb-9b19-d773ba798561',
  '484a7850-3893-11eb-9b19-d773ba798561',
]

async function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const newItems: IContentItem[] = []

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    if (releasesTracks.includes(newItem.id)) {
      newItem.tags = addTag(newItem, 'releases')
      newItem.properties = addProperty(newItem, 'hide-from-lists')
    }

    newItems.push(newItem)
  }

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  window.confirm('This can mess stuff up. Are you sure??')

  doBackup()
  writeFileSync(srcIndex(), JSON.stringify(compressIndex(newItems)))
  writeFileSync(distIndex(), JSON.stringify(compressIndex(newItems)))
  generateChunks(newItems)
}

function srcIndex() {
  const { remote } = window.require('electron')
  const { join } = remote.require('path')
  return join(__dirname, '..', '..', '..', '..', 'static', 'content', 'index.json')
}

function distIndex() {
  const { remote } = window.require('electron')
  const { join } = remote.require('path')
  return join(__dirname, '..', '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
}

function doBackup() {
  const { remote } = window.require('electron')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants, unlinkSync } = remote.require('fs')
  const { join, extname } = remote.require('path')

  const backupDir = join(__dirname, '..', '..', '..', '..', 'static', 'content', 'backups')

  const backupsCount = readdirSync(backupDir)
    .filter((fileName: string) =>
      extname(fileName) === '.json'
    ).length

  const backupIndex = join(__dirname, '..', '..', '..', '..', 'static', 'content', 'backups', backupsCount + '-index.json')

  copyFileSync(srcIndex(), backupIndex)

  alert('Done!')
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
          <li>
            <a
              href="#"
              onClick={doBackup}
            >
              Make a backup
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
