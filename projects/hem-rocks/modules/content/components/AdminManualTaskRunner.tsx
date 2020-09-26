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

  //   if (!found && newItem.slug === 'corruscations') {
  //     newItem.slug = 'instant-coma'
  //     found = true
  //   }

  //   newItems.push(newItem)
  // }

  // ***** CHANGE ITEMS *****

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    if (
      newItem.secondaryAttribution === 'Lockdown Doodles'
      && newItem.published
    ) {
      // newItem.title = newItem.title.replace(' - M3 reference', '')
      // newItem.slug = newItem.slug.replace('-m-3-reference', '').replace('-m-4-reference', '').replace('w-illow', 'willow')
      // newItem.secondaryAttribution = 'Eating the Stars'
      newItem.keyArt = 'lockdown-doodles.jpg'
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

  // const albums = [
  //   {
  //     keyArt: 'no-bosses-no-bullshit.jpg',
  //     primaryAttribution: 'Bubonic Plague',
  //     basePath: '/Kalt/deploy/2008/HEMK0008_No-Bosses-No-Bullshit/Unmastered',
  //     secondaryAttribution: 'No Bosses No Bullshit',
  //     getTitle: (track: any) => track.split(' - ')[1].replace(/.mp3$/, ''),
  //     tracks: [
  //       '01 - Dracula.mp3',
  //       '02 - Orange Octagon.mp3',
  //       '03 - The Sleep Room.mp3',
  //       '04 - Science Is Scientist.mp3',
  //       '05 - Fun Grave.mp3',
  //       '06 - Down With The Fire.mp3',
  //       '07 - Dream Algebra.mp3',
  //       '08 - Robots Tourette\'s.mp3',
  //       '09 - Sal\'s Tropical Depression.mp3',
  //       '10 - Green Umbrella.mp3',
  //       '11 - Synesthisia.mp3',
  //     ],
  //   }, {
  //     keyArt: 'the-remarkable-thing-about-swans-ep.jpg',
  //     primaryAttribution: 'The Remarkable Thing About Swans',
  //     basePath: '/Kalt/deploy/2008/HEMK0015_The-Remarkable-Thing-about-Swans/Unmastered/The Remarkable Thing About Swans EP',
  //     secondaryAttribution: 'The Remarkable Thing About Swans EP',
  //     getTitle: (track: any) => track.split(' - ')[1].replace(/.mp3$/, ''),
  //     tracks: [
  //       '01 - The Animals Build A Bridge.mp3',
  //       '02 - Sita in the Garden.mp3',
  //       '03 - Song for Martes.mp3',
  //       '04 - Swans and Storks.mp3',
  //       '05 - Torn Into Shreds.mp3',
  //       '06 - Animal Grotto.mp3',
  //       '07 - Silver Dagger.mp3',
  //     ],
  //   }, {
  //     keyArt: 'demonstration-disc.jpg',
  //     primaryAttribution: 'Jason Grier',
  //     basePath: '/JAG/Temp/2018 FE DIGITALS/Full Release Materials/Unprocessed/HEMK0100_Demonstration_Disc',
  //     secondaryAttribution: 'Demonstration Disc',
  //     getTitle: (track: any) => track.replace(/.wav$/, ''),
  //     tracks: [
  //       '1.wav',
  //       '2.wav',
  //       '3.wav',
  //       '4.wav',
  //       '5.wav',
  //       '6.wav',
  //       '7.wav',
  //       '8.wav',
  //       '9.wav',
  //       '10.wav',
  //     ],
  //   }, {
  //     keyArt: 'instant-coma.jpg',
  //     primaryAttribution: 'Bubonic Plague',
  //     basePath: '/Kalt/deploy/2007/HEMK0003_Instant-Coma/Unmastered',
  //     secondaryAttribution: 'Instant Coma',
  //     getTitle: (track: any) => track.split(' - ')[1].replace(/.mp3$/, ''),
  //     tracks: [
  //       '01 - Polyhedron.mp3',
  //       '02 - Bad Moods.mp3',
  //       '03 - Gray Wave City.mp3',
  //       '04 - Nonsense Nonsense.mp3',
  //       '05 - The Greek Ambassador.mp3',
  //       '06 - Walkin Again.mp3',
  //       '07 - Invizible Clock.mp3',
  //       '08 - Debbie get the fuck out of my house.mp3',
  //     ],
  //   }, {
  //     keyArt: 'the-human-ear-volume-2.jpg',
  //     primaryAttribution: {
  //       'M_01_Age Song.wav': 'Garbaej Katz',
  //       'M_02_Oh No Its You Again.wav': 'Alex Black Ivory',
  //       'M_03_Say It With Your Love.wav': 'Julia Holter & Jason Grier',
  //       'M_04_Weight Set Waiting.wav': 'Muscle Drum',
  //       'M_05_Walking Again.wav': 'Geneva Jacuzzi',
  //       'M_06_Buildings Built for Us.wav': 'Alex Black Ivory',
  //       'M_07_Pirates Tale.wav': 'Maria Minerva (x Jason Grier)',
  //       'M_08_Here Is Tonight.wav': 'Stellar Om Source',
  //       'M_09_Heart Shaped Rock.wav': 'Jason Grier & Nite Jewel',
  //       'M_10_Nite Jewelia.wav': 'Julia Holter & Nite Jewel',
  //       'M_11_Ballad of a Perfect Sphere.wav': 'Babooshka',
  //       'M_12_Moni Mon Amie.wav': 'Julia Holer',
  //       'M_13_Magnetic Love.wav': 'Raw Geronimo',
  //       'M_14_Rebelly Rose.wav': 'Softboiled Eggies',
  //       'M_15_Rangelines.wav': 'Laurel Halo',
  //       'M_16_5 For Madison.wav': 'Michael Pisaro',
  //     } as any,
  //     basePath: '/Kalt/deploy/2011/HEMK0018_Volume-2/Formats/16bit WAV',
  //     secondaryAttribution: 'The Human Ear Volume 2',
  //     getTitle: (track: any) => track.replace(/^M_/, '').replace(/^[0-9]+_/, '').replace(/.wav$/, '').replace('5 For', 'For'),
  //     tracks: [
  //       'M_01_Age Song.wav',
  //       'M_02_Oh No Its You Again.wav',
  //       'M_03_Say It With Your Love.wav',
  //       'M_04_Weight Set Waiting.wav',
  //       'M_05_Walking Again.wav',
  //       'M_06_Buildings Built for Us.wav',
  //       'M_07_Pirates Tale.wav',
  //       'M_08_Here Is Tonight.wav',
  //       'M_09_Heart Shaped Rock.wav',
  //       'M_10_Nite Jewelia.wav',
  //       'M_11_Ballad of a Perfect Sphere.wav',
  //       'M_12_Moni Mon Amie.wav',
  //       'M_13_Magnetic Love.wav',
  //       'M_14_Rebelly Rose.wav',
  //       'M_15_Rangelines.wav',
  //       'M_16_5 For Madison.wav',
  //     ],
  //   }
  // ]

  // for (const album of albums) {
  //   const { keyArt, primaryAttribution: basePrimaryAttribution, basePath, secondaryAttribution, getTitle, tracks } = album

  //   console.log('***' + secondaryAttribution + '***')

  //   for (const track of tracks) {
  //     const title = getTitle(track)
  //     const primaryAttribution = typeof basePrimaryAttribution === 'string' ? basePrimaryAttribution : basePrimaryAttribution[track]
  //     const slug = slugify(title) + '-' + slugify(primaryAttribution)
  //     const audioFilename = basePath + '/' + track

  //     console.log(slug)

  //     newItems.push(modelize({
  //       id: id.toString(),
  //       tags: '',
  //       title,
  //       secondaryTitle: primaryAttribution,
  //       category: 'tracks',
  //       attribution: primaryAttribution,
  //       date: '17.09.2020',
  //       keyArt,
  //       preview: true,
  //       published: true,
  //       releasePhase: '1',
  //       secondaryAttribution,
  //       slug,
  //       audioFilename,
  //     } as Partial<IContentItem>))

  //     ++ id
  //   }
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
