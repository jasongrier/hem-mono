import { AnyAction } from 'redux'

export interface IAnnotation {
  title: string
  description: string
  timestamp: number
}

export interface IFile {
  annotations: IAnnotation[]
}

export interface IDocument {
}

export interface IState {
}

export const PLACEHOLDER_ACTION = 'SET_CANVASPLACEHOLDER_ACTION'

export interface IPlaceholderAction extends AnyAction {
  type: typeof PLACEHOLDER_ACTION
  payload: any
}

export type Action = IPlaceholderAction
