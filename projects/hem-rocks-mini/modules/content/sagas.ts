import { call, put, select, takeLatest } from 'redux-saga/effects'
import { slugify } from 'voca'
import {
  REQUEST_READ_ITEMS,
  REQUEST_UPDATE_ITEMS,

  doReadItems as doReadItemsAc,
  doUpdateItems as doUpdateItemsAc,
  requestReadItems as requestReadItemsAc,

  modelize,
  REQUEST_CREATE_ITEMS,
} from './index'

function* createItems({ payload }: any) {
  try {
    const { remote } = window.require('electron')
    const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
    const { extname, join } = remote.require('path')
    const { execSync } = remote.require('child_process')

    const item = payload[0] // TODO: Handle multiples

    item.slug = slugify(item.name)

    const file = join(__dirname, '..', '..', 'static', 'content', item.slug + '.json')
    const distFile = join(__dirname, '..', '..', '..', '..', 'dist', 'static', 'content', item.slug + '.json')

    if (existsSync(file)) {
      console.error(`Src file already exists: ${file}`)
    }

    if (!existsSync(distFile)) {
      console.error(`Dist file not found: ${distFile}`)
    }

    writeFileSync(file, JSON.stringify(item, null, 2))

    execSync(`rm ${distFile}`, { stdio: 'inherit' })
    execSync(`cp ${file} ${distFile}`, { stdio: 'inherit' })

    yield put(doUpdateItemsAc([item]))
    yield put(requestReadItemsAc({ page: 1, size: 10000 }))
  }

  catch (err) {
    console.log(err)
  }
}

function* readItems() {
  try {
    const res = yield call(fetch, '/static/content/index.json')
    const entries = yield res.json()
    const items = []

    for (const entry of entries) {
      const res = yield call(fetch, `/static/content/${entry.slug}.json`)
      const rawItem = yield res.json()
      items.push(modelize(rawItem))
    }

    yield put(doReadItemsAc(items))
  }

  catch (err) {
    console.log(err)
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

    if (!existsSync(file)) {
      console.error(`Src file not found: ${file}`)
      return
    }

    if (!existsSync(distFile)) {
      console.error(`Dist file not found: ${distFile}`)
      return
    }

    writeFileSync(file, JSON.stringify(updatedItem, null, 2))

    execSync(`rm ${distFile}`, { stdio: 'inherit' })
    execSync(`cp ${file} ${distFile}`, { stdio: 'inherit' })

    yield put(doUpdateItemsAc([updatedItem]))
    yield put(requestReadItemsAc({ page: 1, size: 10000 }))
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* createItemsSaga() {
  yield takeLatest(REQUEST_CREATE_ITEMS, createItems)
}

function* readItemsSaga() {
  yield takeLatest(REQUEST_READ_ITEMS, readItems)
}

function* updateItemsSaga() {
  yield takeLatest(REQUEST_UPDATE_ITEMS, updateItems)
}

export {
  readItemsSaga,
  updateItemsSaga,
}
