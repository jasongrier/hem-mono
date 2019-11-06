import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

export type ThunkResult<R> = ThunkAction<R, IState, undefined, Action> // TODO: How to get around putting this in every project??

export interface IMidstTimelineFrame { // TODO: Move Midst types to common
  content: string
  lineNumber: number
  timestamp: number
}

export interface IMidstFile { // TODO: Move Midst types to common
  editorTimelineFrames: IMidstTimelineFrame[]
  meta: {
		editorFontFamily: string
		editorFontSize: number
		editorHighestEverDraftNumber: number
		editorTitle: string
    editorDraftMarkers: []
  }
}

export interface IPoem {
  author: string
  authorId: string
  data: IMidstFile | null
  hidden?: boolean
  poemId: string
  processNote: string
  title: string
  trigger?: boolean
  url: string
}

export interface IState {
  mobileNavOpen: boolean
  poems: IPoem[]
  processNoteOpen: boolean
}

export const LOAD_POEM_DATA = 'LOAD_POEM_DATA'
export const SET_MOBILE_NAV_OPEN = 'SET_MOBILE_NAV_OPEN'
export const SET_PROCESS_NOTE_OPEN = 'SET_PROCESS_NOTE_OPEN'

export interface ILoadPoemData extends AnyAction {
  payload: { poemId: string, data: IMidstFile}
  type: typeof SET_MOBILE_NAV_OPEN
}

export interface ISetMobileNavOpen extends AnyAction {
  payload: boolean
  type: typeof SET_MOBILE_NAV_OPEN
}

export interface ISetProcessNoteOpen extends AnyAction {
  payload: boolean
  type: typeof SET_PROCESS_NOTE_OPEN
}

export type Action =
  ILoadPoemData
  | ISetMobileNavOpen
  | ISetProcessNoteOpen
