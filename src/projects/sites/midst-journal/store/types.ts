import { AnyAction } from 'redux'

export interface IPoem {
  author: string
  authorId: string
  hidden?: boolean
  poemId: string
  title: string
  url: string
}

export interface IState {
  mobileNavOpen: boolean
  poems: IPoem[]
  processNoteOpen: boolean
}

export const SET_MOBILE_NAV_OPEN = 'SET_MOBILE_NAV_OPEN'
export const SET_PROCESS_NOTE_OPEN = 'SET_PROCESS_NOTE_OPEN'

export interface ISetMobileNavOpen extends AnyAction {
  payload: boolean
  type: typeof SET_MOBILE_NAV_OPEN
}

export interface ISetProcessNoteOpen extends AnyAction {
  payload: boolean
  type: typeof SET_PROCESS_NOTE_OPEN
}

export type Action = ISetMobileNavOpen | ISetProcessNoteOpen
