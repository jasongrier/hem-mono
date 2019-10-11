import { AnyAction } from 'redux'

type Theme = 'baker-miller' | 'grape-soda' | 'lakritz'

export interface ITimelineFrame {
  content: string
  lineNumber: number
  timestamp: string
  draftMarker: string
}

export interface IState {
  focusMode: boolean
  theme: Theme
  timeline: ITimelineFrame[]
  timelineIndex: number
  title: string
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: null
}

export type Action = ISomeAction
