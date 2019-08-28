import {
  SET_MOBILE_NAV_OPEN,

  Action,
} from './types'

const setMobileNavOpen = (mobileNavOpen: boolean): Action => ({
  type: SET_MOBILE_NAV_OPEN,
  payload: mobileNavOpen,
})

export {
  setMobileNavOpen,
}
