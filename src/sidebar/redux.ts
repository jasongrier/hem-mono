import { IProjectFile } from '../project/types'

import {
    APPLY_FILTER,
    UPDATE_CONTENT,

    Action,

    IState,
  } from './types'

  // ================================================================================
  // Actions
  // ================================================================================
  const applyFilter = (searchText: string): Action => ({
    type: APPLY_FILTER,
    payload: searchText,
  })

  const updateContent = (
    payload: { allFiles: IProjectFile[], allTags: IProjectFile[]}
  ): Action => ({
    type: UPDATE_CONTENT,
    payload,
  })

  // ================================================================================
  // Reducer
  // ================================================================================
  const initialState: IState = {
    allFiles: [],
    allTags: [],
    filteredFiles: [],
    filteredTags: [],
  }

  const reducer = (
    state: IState = initialState,
    {type, payload}: IAction,
  ): IState => {
    switch (type) {
      case APPLY_FILTER:
        const filteredFiles: IProjectFile[] = []
        const filteredTags: string[] = []
        return { ...state, filteredFiles, filteredTags }

      case UPDATE_CONTENT:
        return { ...state, allFiles: payload.allFiles, allTags: payload.allTags }

      default:
        return state
    }
  }

  export {
    applyFilter,
    updateContent,

    initialState,

    reducer,
  }
