import { AnyAction } from 'redux'

export interface IPoem {
  slug: string
  title: string
  author: string
}

export interface IState {
  mobileNavOpen: boolean
  processNoteOpen: boolean
  poems: IPoem[]
}

export const SET_MOBILE_NAV_OPEN = 'SET_MOBILE_NAV_OPEN'
export const SET_PROCESS_NOTE_OPEN = 'SET_PROCESS_NOTE_OPEN'

export interface ISetMobileNavOpen extends AnyAction {
  type: typeof SET_MOBILE_NAV_OPEN
  payload: boolean
}

export interface ISetProcessNoteOpen extends AnyAction {
  type: typeof SET_PROCESS_NOTE_OPEN
  payload: boolean
}

export type Action = ISetMobileNavOpen | ISetProcessNoteOpen
