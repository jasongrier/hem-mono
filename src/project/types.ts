export interface IFile {
  name: string
}

export interface ITag {
  name: string
}

export interface IProject {
  files: IFile[]
  tags: ITag[]
}

export interface IState {
  files: any[]
  filteredFiles: any[]
  filteredTags: any[]
  filterText: string
  tags: any[]
}

export const LOAD_PROJECT = 'LOAD_PROJECT'
export const FILTER_FILES = 'FILTER_FILES'
export const FILTER_TAGS = 'FILTER_TAGS'

export interface ILoadProject extends IAction {
  type: typeof LOAD_PROJECT
  payload: IProject
}

export interface IFilterFiles extends IAction {
  type: typeof FILTER_FILES
  payload: string
}

export interface IFilterTags extends IAction {
  type: typeof FILTER_TAGS
  payload: string
}

export type Action =
    ILoadProject
  | IFilterFiles
  | IFilterTags
