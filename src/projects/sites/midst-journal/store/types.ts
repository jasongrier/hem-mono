import { AnyAction } from 'redux'

export interface IPoem {
  slug: string
  title: string
  author: string
}

export interface IState {
  mobileNavOpen: boolean
  poems: IPoem[]
}

export const SET_MOBILE_NAV_OPEN = 'SET_MOBILE_NAV_OPEN'

export interface ISetMobileNavOpen extends AnyAction {
  type: typeof SET_MOBILE_NAV_OPEN
  payload: boolean
}

export type Action = ISetMobileNavOpen
