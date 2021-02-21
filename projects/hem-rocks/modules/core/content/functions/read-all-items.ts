import { call } from 'redux-saga/effects'
import { validateCompressionMap, uncompressItem, modelize, hasCategory } from '../index'

function *readAllItems() {
  validateCompressionMap()

  const res = yield call(fetch, '/static/content/index.json')
  const entries = yield res.json()
  let items = entries.map(uncompressItem).map(modelize)

  if (!window.process?.env.ELECTRON_MONO_DEV) {
    items.filter((item: any) => !hasCategory(item, 'assets'))
  }

  return items
}

export default readAllItems
