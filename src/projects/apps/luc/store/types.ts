import { AnyAction } from 'redux'

export interface ITaxonomyTerm {
  taxonomy: 'category' | 'tag'
  term: string
}

export interface IAcknowlegement {
  type: 'author' | 'source' | 'contributor' | 'licensor'
  content: string
}

export interface IFile {
  type: 'original' | 'derivative'
  filePath: string
  fileName: string
  annotations: IAnnotation[]
  taxonomy: ITaxonomyTerm[]
}

export interface IAnnotation {
  title: string
  description: string
  start: number
  end: number
  taxonomy: ITaxonomyTerm[]
  file: IFile
}

export interface IChapter {
  title: string
  description: string
  content: IAnnotation[]
}

export interface IDocument {
  title: string
  description: string
  acknowlegements: IAcknowlegement[]
  files: IFile[]
  chapters: IChapter[]
}

export interface IState {
  currentDocument: IDocument | null
}

export const PLACEHOLDER_ACTION = 'PLACEHOLDER_ACTION'

export interface IPlaceholderAction extends AnyAction {
  type: typeof PLACEHOLDER_ACTION
  payload: any
}

export type Action = IPlaceholderAction
