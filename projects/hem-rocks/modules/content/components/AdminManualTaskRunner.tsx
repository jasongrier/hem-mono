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
  const trackSlugs: string[][] = []

  // let id = Math.max(...allContentItems.map(item => parseInt(item.id, 10)))
  let id = 1

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)
    newItem.id = id.toString()

    if (newItem.secondaryAttribution === 'Michael Pisaro\'s Dog Star Orchestra 2010') {
      const dayNumber = parseInt(newItem.audioFilename.split('Day ')[1].split('/')[0], 10)
      newItem.secondaryAttribution = 'Day ' + dayNumber
      newItem.keyArt = slugify('Michael Pisaro\'s Dog Star Orchestra 2010') + '.jpg'
      newItem.title = titleCase(newItem.title.replace(/^[0-9]+_/, '').replace(/_/g, ' '))

      if (!trackSlugs[dayNumber]) {
        trackSlugs[dayNumber] = []
      }

      trackSlugs[dayNumber].push(newItem.slug)

      newItem.slug = newItem.slug.replace(/^[0-9]+-/, '')
    }

    newItems.push(newItem)
    ++ id
  }

  for (let i = 1; i <= 7; i ++) {
    const myTrackSlugs = trackSlugs[i].join("\n")

    newItems.push(modelize({
      id: id.toString(),
      tags: 'discs, format:digital',
      title: 'Day ' + i,
      secondaryTitle: 'Michael Pisaro\'s Dog Star Orchestra 2010',
      category: 'label',
      attribution: 'Michael Pisaro\'s Dog Star Orchestra',
      date: '17.09.2020',
      keyArt: slugify('Michael Pisaro\'s Dog Star Orchestra 2010') + '.jpg',
      preview: true,
      published: true,
      releasePhase: '1',
      secondaryAttribution: 'Michael Pisaro\'s Dog Star Orchestra 2010',
      slug: slugify('Michael Pisaro\'s Dog Star Orchestra 2010') + 'day-' + i,
      trackSlugs: myTrackSlugs,
    } as Partial<IContentItem>))

    ++ id
  }

  // for (const oldItem of allContentItems) {
  //   const newItem = Object.assign({}, oldItem)

  //   if (newItem.secondaryAttribution === 'Michael Pisaro\'s Dog Star Orchestra 2009') {
  //     const disc = parseInt(newItem.audioFilename.split('Day ')[1].split('/')[0], 10)

  //     console.log(disc)

  //     newItem.tags = 'discs, done-for-now'
  //     newItem.keyArt = 'dog-star-2009.jpg'
  //   }

  //   newItems.push(newItem)
  //   // ++ id
  // }

  // const tracks = [
  //   'DeliciousSFAI.mp3',
  //   'Chimacum RainSFAI.mp3',
  // ]

  // const trackSlugs: string[] = []

  // for (const track of tracks) {
  //   const slug = slugify(track.replace('SFAI.mp3', '')) + '-linda-perhacs'
  //   const title = track.replace('SFAI.mp3', '')

  //   trackSlugs.push(slug)

  //   newItems.push(modelize({
  //     id: id.toString(),
  //     title,
  //     category: 'tracks',
  //     attribution: 'Linda Perhacs',
  //     date: '17.09.2020',
  //     keyArt: 'linda-perhacs-live-at-sfai.jpg',
  //     preview: true,
  //     published: true,
  //     releasePhase: '1',
  //     audioFilename: '/Volumes/April_Kepner/Eva_Vollmer/Disorganised/Kalt/live/2010/Linda Perhacs Live at SFAI 2010/Live @ SFAI/' + track,
  //     slug,
  //   } as Partial<IContentItem>))

  //   ++ id
  // }

  // newItems.push(modelize({
  //   id: id.toString(),
  //   tags: 'albums, primary-format, format:digital',
  //   title: 'Live at SFAI',
  //   secondaryTitle: 'Linda Perhacs',
  //   category: 'label',
  //   attribution: 'Linda Perhacs',
  //   date: '17.09.2020',
  //   keyArt: 'linda-perhacs-live-at-sfai.jpg',
  //   preview: true,
  //   published: true,
  //   releasePhase: '1',
  //   slug: 'linda-perhacs-live-at-sfai',
  //   trackSlugs: trackSlugs.join("\n"),
  // } as Partial<IContentItem>))

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
