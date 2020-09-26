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
import { all } from 'redux-saga/effects'

function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync } = remote.require('fs')
  const { join, extname } = remote.require('path')

  const newItems: IContentItem[] = []

  // ***** FIND A DUPLICATE SLUG *****

  // let found = false

  // for (const oldItem of allContentItems) {
  //   const newItem = Object.assign({}, oldItem)

  //   if (newItem.slug === 'thrash-burn') {
  //     console.log('found one')
  //   }

  //   newItems.push(newItem)
  // }

  // ***** CHANGE ITEMS *****

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    if (
      newItem.secondaryAttribution === 'Live at CalArts'
      && newItem.published
    ) {
      // newItem.title = newItem.title.replace(' - M3 reference', '')
      // newItem.slug = newItem.slug.replace('-m-3-reference', '').replace('-m-4-reference', '').replace('w-illow', 'willow')
      // newItem.secondaryAttribution = 'Eating the Stars'
      newItem.keyArt = 'jason-grier-and-julia-holter-live.jpg'
    }

    newItems.push(newItem)
  }

  // ***** ADD TRACKS FROM DISK *****

  // let id = 1

  // for (const oldItem of allContentItems) {
  //   const newItem = Object.assign({}, oldItem)
  //   newItem.id = id.toString()
  //   newItems.push(newItem)
  //   ++ id
  // }

  // const tracks = [
  //   'Side A - Lats Yerk 45 FINAL.aif',
  //   'Side B - Herman The Bull 45 FINAL.aif',
  // ]

  // const trackSlugs = []

  // for (const track of tracks) {
  //   const basePath = '/Kalt/deploy/2011/HEMK0019_Lats-Yerk/Deliverables/SP/'
  //   const title = track.split(' - ')[1].replace(/ 45 FINAL.aif$/, '')
  //   const slug = slugify(title) + '-jeepneys'
  //   const audioFilename = basePath + track

  //   trackSlugs.push(slug)

  //   console.log(slug)

  //   newItems.push(modelize({
  //     id: id.toString(),
  //     tags: '',
  //     title,
  //     secondaryTitle: 'Ariel Pink',
  //     category: 'tracks',
  //     attribution: 'Ariel Pink',
  //     date: '17.09.2020',
  //     keyArt: slug + '.jpg',
  //     preview: true,
  //     published: true,
  //     releasePhase: '1',
  //     secondaryAttribution: 'Scared Famous',
  //     slug,
  //     audioFilename,
  //   } as Partial<IContentItem>))

  //   ++ id
  // }

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
