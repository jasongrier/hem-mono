import { call, put, select, takeLatest } from 'redux-saga/effects'
import { compact, isEmpty } from 'lodash'
import {
  REQUEST_CREATE_ITEMS,
  REQUEST_DELETE_ITEMS,
  REQUEST_READ_ITEMS,
  REQUEST_UPDATE_ITEMS,

  IIndexEntry,

  doCreateItems as doCreateItemsAc,
  doDeleteItems as doDeleteItemsAc,
  doReadItems as doReadItemsAc,
  doUpdateItems as doUpdateItemsAc,
  requestCreateItems as requestCreateItemsAc,
  requestReadItems as requestReadItemsAc,

  modelize,
  IContentItem,
} from './index'

function* createItems({ payload }: any) {
  try {
    const { remote } = window.require('electron')
    const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
    const { extname, join } = remote.require('path')
    const { execSync } = remote.require('child_process')

    const item = Object.assign({}, payload[0]) // TODO: Handle multiples

    if (
      !item.title
      || item.title.length === 0
    ) {
      console.error(`Item has no title!!`)
      return
    }

    if (
      !item.date
      || item.date.length === 0
    ) {
      console.error(`Item has no date!!`)
      return
    }

    const file = join(__dirname, '..', '..', 'static', 'content', item.slug + '.json')
    const indexFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', item.slug + '.json')
    const distIndexFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

    if (existsSync(file)) {
      console.error(`Src file already exists: ${file}`)
      return
    }

    if (existsSync(distFile)) {
      console.error(`Dist file already exists: ${distFile}`)
      return
    }

    if (!existsSync(indexFile)) {
      console.error('Src index does not exist.')
      return
    }

    if (!existsSync(distIndexFile)) {
      console.error('Dist index does not exist.')
      return
    }

    writeFileSync(file, JSON.stringify(item, null, 2))
    execSync(`cp ${file} ${distFile}`, { stdio: 'inherit' })

    const index = JSON.parse(readFileSync(indexFile, 'utf8'))

    index.push(item)

    writeFileSync(indexFile, JSON.stringify(index, null, 2))
    execSync(`cp ${indexFile} ${distIndexFile}`, { stdio: 'inherit' })

    yield put(doCreateItemsAc([item]))
    yield put(requestReadItemsAc({ page: 1, size: 10000 }))
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
    const file = join(__dirname, '..', '..', 'static', 'content', itemSlug + '.json')
    const distFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', itemSlug + '.json')
    const indexFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distIndexFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

    if (!existsSync(file)) {
      console.error(`Src file does not exist: ${file}`)
      return
    }

    if (!existsSync(distFile)) {
      console.error(`Dist file does not exist: ${distFile}`)
      return
    }

    if (!existsSync(indexFile)) {
      console.error('Src index does not exist.')
      return
    }

    if (!existsSync(distIndexFile)) {
      console.error('Dist index does not exist.')
      return
    }

    execSync(`rm ${file}`, { stdio: 'inherit' })
    execSync(`rm ${distFile}`, { stdio: 'inherit' })

    let index = JSON.parse(readFileSync(indexFile, 'utf8'))

    index = compact(index.map((entry: IIndexEntry) => entry.slug !== itemSlug ? entry : undefined))

    writeFileSync(indexFile, JSON.stringify(index, null, 2))
    execSync(`cp ${indexFile} ${distIndexFile}`, { stdio: 'inherit' })

    yield put(doDeleteItemsAc([itemSlug]))
    yield put(requestReadItemsAc({ page: 1, size: 10000 }))
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
    const file = join(__dirname, '..', '..', 'static', 'content', updatedItem.slug + '.json')
    const distFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', updatedItem.slug + '.json')
    const indexFile = join(__dirname, '..', '..', 'static', 'content', 'index.json')
    const distIndexFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

    if (!existsSync(file)) {
      yield put(requestCreateItemsAc(payload))
      return
    }

    if (!existsSync(distFile)) {
      console.error(`Dist file not found: ${distFile}`)
      return
    }

    if (!existsSync(indexFile)) {
      console.error('Src index does not exist.')
      return
    }

    if (!existsSync(distIndexFile)) {
      console.error('Dist index does not exist.')
      return
    }

    writeFileSync(file, JSON.stringify(updatedItem, null, 2))

    execSync(`rm ${distFile}`, { stdio: 'inherit' })
    execSync(`cp ${file} ${distFile}`, { stdio: 'inherit' })

    const index: IContentItem[] = JSON.parse(readFileSync(indexFile, 'utf8'))
    const entryIndex = index.findIndex(item => item.slug === updatedItem.slug)

    index[entryIndex] = updatedItem

    writeFileSync(indexFile, JSON.stringify(index, null, 2))
    execSync(`cp ${indexFile} ${distIndexFile}`, { stdio: 'inherit' })

    yield put(doUpdateItemsAc([updatedItem]))
    yield put(requestReadItemsAc({ page: 1, size: 10000 }))
  }

  catch (err) {
    console.error(err)
  }
}

//--//

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
