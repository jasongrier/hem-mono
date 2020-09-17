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
  // @ts-ignore
  let nextHighestId = allContentItems.map(item => parseInt(item.id, 10)).sort((a, b) => a - b).pop() + 1
  // const slugs = compact(getContentItemBySlug(allContentItems, 'betrieb').trackSlugs.split('\n'))

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    // if (slugs.includes(newItem.slug)) {
    //   newItem.slug = newItem.slug.replace(/^[0-9]+-/, '')
    //   newItem.title = newItem.title.replace(/^[0-9]+ /, '').replace(' _ ', '/')
    // }

    if (
      hasCategory(newItem, 'tracks') 
      && !newItems.filter(item => hasTag(item, 'albums')).find(item => item.title === newItem.secondaryAttribution)
      && !isEmpty(newItem.secondaryAttribution)
    ) {
      newItems.push(modelize({
        id: nextHighestId.toString(),
        tags: 'albums, primary-format, format:digital',
        title: newItem.secondaryAttribution,
        secondaryTitle: newItem.attribution,
        category: 'label',
        attribution: newItem.attribution,
        date: '17.09.2020',
        keyArt: slugify(newItem.secondaryAttribution) + '.jpg',
        preview: true,
        published: true,
        releasePhase: '1',
        slug: slugify(newItem.secondaryAttribution),
        trackSlugs: allContentItems.filter(item => item.secondaryAttribution === newItem.secondaryAttribution).join('\n'),
        type: 'Album Release',
      } as Partial<IContentItem>))

      ++ nextHighestId
    }

    newItems.push(newItem)
  }

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
