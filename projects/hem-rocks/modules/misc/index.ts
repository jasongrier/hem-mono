import { AnyAction } from 'redux'

export interface IProjectLogo {
  featured: boolean
  logoComponentName: string
  hoverColor: string
  linkTo: string
  tipContent: string
  title: string
  transform: string
}

export interface IState {
  projects: IProjectLogo[]
}

export type Action = AnyAction

export { reducer } from './reducer'
