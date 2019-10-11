import { AnyAction } from 'redux'
import {
  INSERT_LINE,
  REMOVE_LINE,
  UPDATE_LINE,

  TMP_UPDATE_CONTENT,
} from './types'

const tmpUpdateContent = (content: string): AnyAction => ({
  type: TMP_UPDATE_CONTENT,
  payload: content,
})

export {
  tmpUpdateContent,
}
