import { IProjectFile } from '../project/types'

import {
    APPLY_FILTER,

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

  // ================================================================================
  // Reducer
  // ================================================================================
  const initialState: IState = {
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

      default:
        return state
    }
  }

  export {
    applyFilter,

    initialState,

    reducer,
  }
