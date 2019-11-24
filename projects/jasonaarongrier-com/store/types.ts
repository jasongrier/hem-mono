import { AnyAction } from 'redux'

export interface ILink {
  href: string
  rel: string
  target?: string
  title: string
}

export interface ITag {
  id: string
  name: string
}

export interface IItem {
  date: string
  description: string
  id: string
  links: ILink[]
  tags: ITag[]
  text: string
  title: string
  url: string
}

export interface IState {
  items: IItem[]
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: null
}

export type Action = ISomeAction
