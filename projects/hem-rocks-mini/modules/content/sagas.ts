import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  REQUEST_READ_ITEMS,

  doReadItems as doReadItemsAc,

  modelize,
} from './index'

function* readItems() {
  try {
    const res = yield call(fetch, '/static/content/index.json')
    const slugs = yield res.json()
    const items = []

    for (const slug of slugs) {
      const res = yield call(fetch, `/static/content/${slug}.json`)
      const rawItem = yield res.json()
      items.push(modelize(rawItem))
    }

    yield put(doReadItemsAc(items))
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* readItemsSaga() {
  yield takeLatest(REQUEST_READ_ITEMS, readItems)
}

export {
  readItemsSaga,
}
