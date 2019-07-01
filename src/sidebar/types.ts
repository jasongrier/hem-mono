// import { IProjectFile } from '../project/types'

export interface IState {
  allFiles: string[]
  // allTags: IProjectFile[]
  // filteredFiles: IProjectFile[]
  filteredTags: string[]
}

export const APPLY_FILTER = 'APPLY_FILTER'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'

export interface IApplyFilter extends IAction {
  type: typeof APPLY_FILTER
  payload: string
}

export interface IUpdateContent extends IAction {
  type: typeof UPDATE_CONTENT
  // payload: { allFiles: IProjectFile[], allTags: IProjectFile[]}
}

export type Action = IApplyFilter | IUpdateContent
