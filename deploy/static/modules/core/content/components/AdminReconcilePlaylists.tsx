import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import { uniq, noop, last, compact, uniqBy, has, sample, filter, map, find, isEmpty, includes, sortBy, partial } from 'lodash'
import pad from 'pad'
import moment from 'moment'
import $ from 'jquery'
import { autoParagraph } from '../../../../../../lib/functions'
import { modelize, hasTag, getContentItemBySlug, hasCategory, getContentItemsFromList, getContentItemsFromRawList } from '../functions'
import { IIndexEntry, IContentItem, compressIndex } from '..'
import { RootState } from '../../../../index'
import { slugify, titleCase } from 'voca'
import { execSync } from 'child_process'
import { all } from 'redux-saga/effects'
import { IPlaylist } from '../../../../../../lib/modules/website-player'

function reconcilePlaylists(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { existsSync, writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync, constants: fsConstants } = remote.require('fs')
  const { join, extname } = remote.require('path')
  const getMP3Duration = require('get-mp3-duration')

  const newItems: IContentItem[] = []
  const newItemsCache: IContentItem[] = []
  const reconciledItems: IContentItem[] = []

  for (const oldItem of allContentItems) {
    const newItem = Object.assign({}, oldItem)

    newItemsCache.push(newItem)

    if (hasTag(newItem, 'player-playlist')) {
      const attachments = getContentItemsFromRawList(allContentItems, newItem.attachments)

      for (const attachment of attachments) {
        const tag = slugify(newItem.title.replace('Player ', ''))
        if (!hasTag(attachment, tag)) {
          const reconciliationSubject = Object.assign(
            {},
            attachment,
            { tags: (attachment.tags + ', ' + tag).replace(/^, /, '') }
          )

          reconciledItems.push(reconciliationSubject)
        }
      }
    }
  }

  for (const newItem of newItemsCache) {
    const reconciledItem = find(reconciledItems, { id: newItem.id })

    if (reconciledItem) {
      newItems.push(reconciledItem)
    }

    else {
      newItems.push(newItem)
    }
  }

  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****
  // ***** DANGER ZONE *****

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
  writeFileSync(srcIndex, JSON.stringify(compressIndex(newItems)))
  writeFileSync(distIndex, JSON.stringify(compressIndex(newItems)))
}

function AdminReconcilePlaylists(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const [running, setRunning] = useState(0)

  const reconcilePlaylistsOnClick = useCallback(
    function reconcilePlaylistsOnClickFn() {
      runTask(() => reconcilePlaylists(allContentItems))
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
      <h4>Make sure that tracks in the player are also tagged with the player tab that they are in</h4>
      { running === 0 && (
        <ul>
          <li>
            <a
              href="#"
              onClick={reconcilePlaylistsOnClick}
            >
              Click here
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
              Run again...
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminReconcilePlaylists
