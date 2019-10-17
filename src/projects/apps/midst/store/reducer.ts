import { AnyAction } from 'redux'
import {
  INSERT_LINE,
  REMOVE_LINE,
  UPDATE_LINE,

  IState,

  ISelection,
  ITimelineFrame,
} from './types'

const initialState: IState = {
  bufferedCurrentContent: '',
  currentSelection: {
    startLine: 0,
    startPosition: 0,
    endLine: 0,
    endPosition: 0,
  },
  focusMode: false,
  theme: 'baker-miller',
  timeline: [{
    lines: [{
      content: '',
      ranges: [],
    }],
    draftMarker: null,
    timestamp: 0,
  }],
  timelineIndex: 0,
  title: '',
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  let newTimeline: ITimelineFrame[]
  let newSelection: ISelection

  switch (type) {
    case INSERT_LINE:
      return { ...state, currentSelection: payload.selection }

    case REMOVE_LINE:
      return state

    case UPDATE_LINE:
      return state

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
