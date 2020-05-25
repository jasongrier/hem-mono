import { AnyAction } from 'redux'
import {
  COLLAPSE_TOP_BAR,
  EXPAND_TOP_BAR,
  REQUEST_ACTIVE_LIVE_STREAM,
  SET_ACTIVE_LIVE_STREAM,
} from './index'

const collapseTopBar = (): AnyAction => ({
  type: COLLAPSE_TOP_BAR,
  payload: null,
})

const expandTopBar = (): AnyAction => ({
  type: EXPAND_TOP_BAR,
  payload: null,
})

const requestActiveLiveStream = (): AnyAction => ({
  type: REQUEST_ACTIVE_LIVE_STREAM,
  payload: null,
})

const setActiveLiveStream = (contentItemSlug: string): AnyAction => ({
  type: SET_ACTIVE_LIVE_STREAM,
  payload: contentItemSlug,
})

export {
  collapseTopBar,
  expandTopBar,
  requestActiveLiveStream,
  setActiveLiveStream,
}
