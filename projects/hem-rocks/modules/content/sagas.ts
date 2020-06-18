import { call, put, select, takeLatest } from 'redux-saga/effects'
import { compact, isEmpty } from 'lodash'
import {
  REQUEST_CREATE_ITEMS,
  REQUEST_DELETE_ITEMS,
  REQUEST_READ_ITEMS,
  REQUEST_UPDATE_ITEMS,

  doCreateItems as doCreateItemsAc,
  doDeleteItems as doDeleteItemsAc,
  doReadItems as doReadItemsAc,
  doUpdateItems as doUpdateItemsAc,
  requestReadItems as requestReadItemsAc,

  modelize,

  IIndexEntry,
} from './index'

function* createItems({ payload }: any) {
  try {
    const { remote } = window.require('electron')
    const { readFileSync, writeFileSync } = remote.require('fs')
    const { join } = remote.require('path')
    const { execSync } = remote.require('child_process')

    const item = Object.assign({}, payload[0]) // TODO: Handle multiples
    const indexFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distIndexFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
    const index = JSON.parse(readFileSync(indexFile, 'utf8'))

    index.push(item)

    writeFileSync(indexFile, JSON.stringify(index, null, 2))

    execSync(`cp ${indexFile} ${distIndexFile}`, { stdio: 'inherit' })

    yield put(doCreateItemsAc([item]))
    yield put(requestReadItemsAc())
  }

  catch (err) {
    console.error(err)
  }
}

function* deleteItems({ payload }: any) {
  try {
    const { remote } = window.require('electron')
    const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
    const { extname, join } = remote.require('path')
    const { execSync } = remote.require('child_process')

    const itemSlug = payload[0] // TODO: Handle multiples
    const indexFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distIndexFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

    let index: IIndexEntry[] = JSON.parse(readFileSync(indexFile, 'utf8'))

    index = index.filter(entry => entry.slug !== itemSlug)

    writeFileSync(indexFile, JSON.stringify(index, null, 2))

    execSync(`cp ${indexFile} ${distIndexFile}`, { stdio: 'inherit' })

    yield put(doDeleteItemsAc([itemSlug]))
    yield put(requestReadItemsAc())
  }

  catch (err) {
    console.error(err)
  }
}

function* readItems() {
  try {
    const res = yield call(fetch, '/static/content/index.json')
    const entries = yield res.json()
    const items = entries.map(modelize)

    yield put(doReadItemsAc(items))
  }

  catch (err) {
    console.error(err)
  }
}

function* updateItems({ payload }: any) {
  try {
    const { remote } = window.require('electron')
    const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
    const { extname, join } = remote.require('path')
    const { execSync } = remote.require('child_process')

    const updatedItem = payload[0] // TODO: Handle multiples
    const indexFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distIndexFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
    const index: IIndexEntry[] = JSON.parse(readFileSync(indexFile, 'utf8'))
    const entryIndex = index.findIndex(item => item.slug === updatedItem.slug)

    index[entryIndex] = updatedItem

    writeFileSync(indexFile, JSON.stringify(index, null, 2))
    execSync(`cp ${indexFile} ${distIndexFile}`, { stdio: 'inherit' })

    yield put(doUpdateItemsAc([updatedItem]))
    yield put(requestReadItemsAc())
  }

  catch (err) {
    console.error(err)
  }
}

//--//

// TODO: These can all be in one saga! (All projects)
function* createItemsSaga() {
  yield takeLatest(REQUEST_CREATE_ITEMS, createItems)
}

function* deleteItemsSaga() {
  yield takeLatest(REQUEST_DELETE_ITEMS, deleteItems)
}

function* readItemsSaga() {
  yield takeLatest(REQUEST_READ_ITEMS, readItems)
}

function* updateItemsSaga() {
  yield takeLatest(REQUEST_UPDATE_ITEMS, updateItems)
}

export {
  createItemsSaga,
  deleteItemsSaga,
  readItemsSaga,
  updateItemsSaga,
}
