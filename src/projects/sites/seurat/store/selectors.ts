import { RootState } from './index'

export function uiLocked(state: RootState) {
  return !state.app.on || state.app.eventInProgess
}
