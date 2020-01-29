import { AnyAction } from 'redux'

export type ControlName = keyof IControls
export type ControlValue = SequencerMode | number | boolean
export type CursorGroup = 'a' | 'b' | 'c' | 'none'
export type CursorMode = 'erase' | 'draw'
export type SequencerMode = 'random' | 'step' | 'custom' | 'step-confined'

export interface ISound {
  [note: string]: string
}

export interface IDot {
  cursorGroup: CursorGroup
  sound: string | undefined
}

export interface IControls {
  continuousControlA: number
  continuousControlB: number
  continuousControlC: number
  continuousControlD: number
  mutuallyExclusive: boolean
  customScript: string
  sequencerMode: SequencerMode
}

export interface IGroupControls {
  a: IControls,
  b: IControls,
  c: IControls,
  // TODO: Omit doesn't work in `PerformanceControls.tsx`
  none: IControls,
}

export interface ICanvas {
  controls: IGroupControls
  dots: IDot[]
  name: string
}

export interface IState {
  canvases: ICanvas[]
  cueMode: boolean
  codeEditorOpen: CursorGroup | false
  currentCanvasIndex: number
  cursorGroup: CursorGroup
  cursorMode: CursorMode
  dragging: boolean
  drumMode: boolean
  eventInProgess: boolean
  mainVolume: number
  on: boolean
  playing: boolean
  undoIndex: number
  undoStack: IState[]
}

export const CLEAR_CANVAS = 'CLEAR_CANVAS'
export const OPENING_SEQUENCE_BEGUN = 'OPENING_SEQUENCE_BEGUN'
export const OPENING_SEQUENCE_DONE = 'OPENING_SEQUENCE_DONE'
export const REDO = 'REDO'
export const SET_CUE_MODE = 'SET_CUE_MODE'
export const SET_CURRENT_CANVAS = 'SET_CURRENT_CANVAS'
export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'
export const SET_DEVICE_ON = 'SET_DEVICE_ON'
export const SET_DRAGGING = 'SET_DRAGGING'
export const SET_DRUM_MODE = 'SET_DRUM_MODE'
export const SET_PLAYING = 'SET_PLAYING'
export const SET_MAIN_VOLUME = 'SET_MAIN_VOLUME'
export const UNDO = 'UNDO'
export const UPDATE_CONTROL = 'UPDATE_CONTROL'
export const UPDATE_DOT = 'UPDATE_DOT'

export interface IClearCanvas extends AnyAction {
  type: typeof CLEAR_CANVAS
  payload: null
}

export interface IOpeningSequenceBegun extends AnyAction {
  type: typeof OPENING_SEQUENCE_BEGUN
  payload: null
}

export interface IOpeningSequenceDone extends AnyAction {
  type: typeof OPENING_SEQUENCE_DONE
  payload: null
}

export interface IRedo extends AnyAction {
  type: typeof REDO
  payload: null
}

export interface ISetCueMode extends AnyAction {
  type: typeof SET_CUE_MODE
  payload: boolean
}

export interface ISetCurrentCanvas extends AnyAction {
  type: typeof SET_CURRENT_CANVAS
  payload: number
}

export interface ISetCursorGroup extends AnyAction {
  type: typeof SET_CURSOR_GROUP
  payload: CursorGroup
}

export interface ISetCursorMode extends AnyAction {
  type: typeof SET_CURSOR_MODE
  payload: CursorMode
}

export interface ISetDragging extends AnyAction {
  type: typeof SET_DRAGGING
  payload: boolean
}

export interface ISetDrumMode extends AnyAction {
  type: typeof SET_DRUM_MODE
  payload: boolean
}

export interface ISetDeviceOn extends AnyAction {
  type: typeof SET_DEVICE_ON
  payload: boolean
}

export interface ISetMainVolume extends AnyAction {
  type: typeof SET_MAIN_VOLUME
  payload: boolean
}

export interface ISetPlaying extends AnyAction {
  type: typeof SET_PLAYING
  payload: boolean
}

export interface IUndo extends AnyAction {
  type: typeof UNDO
  payload: null
}

export interface IUpdateControl extends AnyAction {
  type: typeof UPDATE_CONTROL
  payload: { cursorGroup: CursorGroup, key: string, value: number }
}

export interface IUpdateDot extends AnyAction {
  type: typeof UPDATE_DOT
  payload: {dotNumber: number, value: CursorGroup}
}

export type Action =
    IClearCanvas
  | IOpeningSequenceBegun
  | IOpeningSequenceDone
  | IRedo
  | ISetCueMode
  | ISetCurrentCanvas
  | ISetCursorGroup
  | ISetCursorMode
  | ISetDeviceOn
  | ISetDragging
  | ISetDrumMode
  | ISetMainVolume
  | ISetPlaying
  | IUndo
  | IUpdateControl
  | IUpdateDot
