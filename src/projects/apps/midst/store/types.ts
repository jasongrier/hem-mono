import { AnyAction } from 'redux'

type Theme = 'baker-miller' | 'grape-soda' | 'lakritz'
type Formatting = 'bold' | 'italic' | 'sans-serif' | 'serif'

/**
 * A selection object that includes position and line information and can
 * cross multiple lines. If there is no selection then all fields will have
 * the same value, which is simply the cursor position.
 */
export interface ISelection {
  endLine: number
  endPosition: number
  startLine: number
  startPosition: number
}

/**
 * A styling indication for a single line. Lines can include many of these,
 * but if there are conflictng styles, the last style in the list will win.
 * There is a collator function that maps multiline selections to ranges within
 * individual lines.
 */
export interface IRange {
  attribute: Formatting
  end: number
  start: number
}

/**
 * A line of text
 */
export interface ILine {
  content: string
  ranges: IRange[]
}

/**
 * A captured state of the document at some moment in time.
 */
export interface ITimelineFrame {
  draftMarker: string | null
  lines: ILine[]
  timestamp: number
}

export interface IState {
  bufferedCurrentContent: string
  currentSelection: ISelection
  focusMode: boolean
  theme: Theme
  timeline: ITimelineFrame[]
  timelineIndex: number
  title: string
}

export const INSERT_LINE = 'INSERT_LINE'
export const REMOVE_LINE = 'REMOVE_LINE'
export const UPDATE_LINE = 'UPDATE_LINE'

export interface IInsertLine extends AnyAction {
  type: typeof INSERT_LINE
  payload: number
}

export interface IRemoveLine extends AnyAction {
  type: typeof REMOVE_LINE
  payload: number
}

export interface IUpdateLine extends AnyAction {
  type: typeof UPDATE_LINE
  payload: { content: string, formatting: IRange[] }
}

export type Action =
  IInsertLine
  | IRemoveLine
  | IUpdateLine
