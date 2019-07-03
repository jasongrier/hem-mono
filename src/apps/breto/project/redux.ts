import got from 'got'
import { ThunkAction } from 'redux-thunk'
import {
  LOAD_PROJECT,
  FILTER_FILES,
  FILTER_TAGS,

  IState,
  IFile,
  ITag,

  Action,
  IProject,
} from './types'

const { readFileSync } = window.require('fs')

const files: IFile[] = [
  { name: 'Foo' },
  { name: 'Bar' },
  { name: 'Baz' },
  { name: 'Qux' },
]

const tags: ITag[] = [
  { name: 'Foo' },
  { name: 'Bar' },
  { name: 'Baz' },
  { name: 'Qux' },
]

// ================================================================================
// Actions
// ================================================================================
const loadProject = (project: IProject): Action => ({
  type: LOAD_PROJECT,
  payload: project,
})

const filterFiles = (query: string): Action => ({
  type: FILTER_FILES,
  payload: query,
})

const filterTags = (query: string): Action => ({
  type: FILTER_TAGS,
  payload: query,
})

const someThunkActionCreator = (): ThunkAction<void, IState, null, Action> => async dispatch => {
  // dispatch(loadProject(!!await got('sindresorhus.com')))
}

// ================================================================================
// Reducer
// ================================================================================
const initialState: IState = {
  files,
  filteredFiles: files,
  filteredTags: tags,
  filterText: '',
  tags,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: IAction,
): IState => {
  switch (type) {
    case LOAD_PROJECT:
      return state

    case FILTER_FILES:
      return {...state, filterText: payload }

    case FILTER_TAGS:
      return state

    default:
      return state
  }
}

export {
  loadProject,
  filterFiles,
  filterTags,

  initialState,

  reducer,
}
