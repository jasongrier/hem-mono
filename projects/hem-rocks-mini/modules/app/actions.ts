import { AnyAction } from 'redux'
import {
  COLLAPSE_TOP_BAR,
  EXPAND_TOP_BAR,
} from './index'

const collapseTopBar = (): AnyAction => ({
  type: COLLAPSE_TOP_BAR,
  payload: null,
})

const expandTopBar = (): AnyAction => ({
  type: EXPAND_TOP_BAR,
  payload: null,
})

export {
  collapseTopBar,
  expandTopBar,
}
