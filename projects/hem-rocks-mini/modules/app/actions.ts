import { AnyAction } from 'redux'
import {
  ACTIVATE_APP,
  SET_CURRENT_TAG,
  SET_TOP_BAR_COLLAPSED,

  Action,
} from './index'

// TODO: All projects. Use Action not AnyAction
const activateApp = (): Action => ({
  type: ACTIVATE_APP,
  payload: null,
})

const setCurrentTag = (tag: string | null): Action => ({
  type: SET_CURRENT_TAG,
  payload: tag,
})

const setTopBarCollapsed = (collapsed: boolean): Action => ({
  type: SET_TOP_BAR_COLLAPSED,
  payload: collapsed,
})

export {
  activateApp,
  setCurrentTag,
  setTopBarCollapsed,
}
