import {
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  Action,
} from './types'

const setMobileNavOpen = (mobileNavOpen: boolean): Action => ({
  type: SET_MOBILE_NAV_OPEN,
  payload: mobileNavOpen,
})

const setProcessNoteOpen = (processNoteOpen: boolean): Action => ({
  type: SET_PROCESS_NOTE_OPEN,
  payload: processNoteOpen,
})

export {
  setMobileNavOpen,
  setProcessNoteOpen,
}
