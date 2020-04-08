import { AnyAction } from 'redux'
import {
  ACTIVATE_APP,
  SET_CURRENT_TAG,
  SET_TOP_BAR_COLLAPSED,
} from './index'

const activateApp = (): AnyAction => ({
  type: ACTIVATE_APP,
  payload: null,
})

const setCurrentTag = (tag: string | null): AnyAction => ({
  type: SET_CURRENT_TAG,
  payload: tag,
})

const setTopBarCollapsed = (collapsed: boolean): AnyAction => ({
  type: SET_TOP_BAR_COLLAPSED,
  payload: collapsed,
})

export {
  activateApp,
  setCurrentTag,
  setTopBarCollapsed,
}
