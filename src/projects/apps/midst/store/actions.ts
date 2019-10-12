import { AnyAction } from 'redux'
import {
  INSERT_LINE,
  REMOVE_LINE,
  UPDATE_LINE,

  IRange,
} from './types'

const insertLine = (after: number, content: string): AnyAction => ({
  type: INSERT_LINE,
  payload: { after, content },
})

const removeLine = (number: number): AnyAction => ({
  type: REMOVE_LINE,
  payload: number,
})

const updateLine = (content: string, number: number, ranges: IRange[] | null): AnyAction => ({
  type: UPDATE_LINE,
  payload: { content, number, ranges },
})

export {
  insertLine,
  removeLine,
  updateLine,
}
