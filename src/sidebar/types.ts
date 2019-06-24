import { IProjectFile } from '../project/types'

export interface IState {
  filteredTags: string[]
  filteredFiles: IProjectFile[]
}

export const APPLY_FILTER = 'APPLY_FILTER'

export interface IApplyFilter extends IAction {
  type: typeof APPLY_FILTER
  payload: string
}

export type Action = IApplyFilter
