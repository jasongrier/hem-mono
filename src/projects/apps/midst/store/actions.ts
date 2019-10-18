import { AnyAction } from 'redux'
import {
  INSERT_LINE,
  REMOVE_LINE,
  UPDATE_LINE,

  IRange,
  ISelection,
} from './types'

const insertLine = (selection: ISelection, ranges: IRange[], content: string): AnyAction => ({
  type: INSERT_LINE,
  payload: { selection, ranges, content },
})

const removeLine = (number: number): AnyAction => ({
  type: REMOVE_LINE,
  payload: number,
})

const updateLine = (selection: ISelection, ranges: IRange[], content: string): AnyAction => ({
  type: UPDATE_LINE,
  payload: { selection, ranges, content },
})

export {
  insertLine,
  removeLine,
  updateLine,
}
