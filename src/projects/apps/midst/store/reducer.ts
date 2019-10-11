import { AnyAction } from 'redux'
import {
  TMP_UPDATE_CONTENT,

  IState,
} from './types'

const initialState: IState = {
  currentSelection: {
    startLine: 0,
    startPos: 0,
    endLine: 0,
    endPos: 0,
  },
  focusMode: false,
  theme: 'baker-miller',
  timeline: [{
    content: '',
    number: 0,
    ranges: [],
  }],
  timelineIndex: 0,
  title: '',
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  let newTimeline

  switch (type) {
    case TMP_UPDATE_CONTENT:
      newTimeline = ([] as any).concat(state.timeline)
      newTimeline[state.timelineIndex] = {
        content: payload,
        number: 0,
        ranges: [],
      }
      return { ...state, timeline: newTimeline }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
