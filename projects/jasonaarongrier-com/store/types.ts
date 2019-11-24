import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

// TODO: How to get around putting this in every project??
export type ThunkResult<R> = ThunkAction<R, IState, undefined, Action>

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

export const LOAD_ITEMS = 'LOAD_ITEMS'

export interface ILoadItems extends AnyAction {
  type: typeof LOAD_ITEMS
  payload: IItem[]
}

export type Action = ILoadItems
