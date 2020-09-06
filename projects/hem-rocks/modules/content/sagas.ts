import { call, put, select, takeLatest } from 'redux-saga/effects'
import { map } from 'lodash'
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
  compressIndex,
  uncompressItem,
  validateCompressionMap,

  IIndexEntry,
  IContentItem,
} from './index'
import { hasCategory } from './functions'

function* createItems({ payload }: any) {
  try {
    const { remote } = window.require('electron')
    const { readFileSync, writeFileSync } = remote.require('fs')
    const { join } = remote.require('path')
    const { execSync } = remote.require('child_process')

    const item = Object.assign({}, payload[0]) // TODO: Handle multiples
    const indexFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distIndexFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
    const compressedIndex = JSON.parse(readFileSync(indexFile, 'utf8'))
    const index: IIndexEntry[] = compressedIndex.map(uncompressItem)

    index.push(item)

    writeFileSync(indexFile, JSON.stringify(compressIndex(index)))

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
    const compressedIndex: IIndexEntry[] = JSON.parse(readFileSync(indexFile, 'utf8'))
    const index: IIndexEntry[] = compressedIndex
      .map(uncompressItem)
      .filter(entry => entry.slug !== itemSlug)

    writeFileSync(indexFile, JSON.stringify(compressIndex(index)))

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
    validateCompressionMap()

    const res = yield call(fetch, '/static/content/index.json')
    const entries = yield res.json()
    let items = entries.map(uncompressItem).map(modelize)

    if (!window.process?.env.ELECTRON_MONO_DEV) {
      items.filter((item: any) => !hasCategory(item, 'assets'))
    }

    yield put(doReadItemsAc(items))
  }

  catch (err) {
    console.error(err)
  }
}

function* updateItems({ payload }: any) {
  try {
    const { remote } = window.require('electron')
    const { writeFileSync } = remote.require('fs')
    const { join } = remote.require('path')
    const { execSync } = remote.require('child_process')

    const updatedItem = payload[0] // TODO: Handle multiples
    const dbFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distDbFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
    const state = yield select()
    const { contentItems } = state.content
    const newContentItems: IContentItem[] = [].concat(contentItems)
    const index = contentItems.findIndex((item: any) => item.id === updatedItem.id)

    newContentItems[index] = updatedItem

    writeFileSync(dbFile, JSON.stringify(compressIndex(newContentItems)))
    execSync(`cp ${dbFile} ${distDbFile}`, { stdio: 'inherit' })

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
