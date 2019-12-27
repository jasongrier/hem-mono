import { AnyAction } from 'redux'

// TODO: Break into separate Redux modules
export interface ICarouselItem {
  buttonText: string
  description: string
  headline: string
  packId: string
  soundUrl: string
  subHeadline: string
}

export interface IImage {
  alt: string
  tags: string[]
  url: string
}

export interface IArticle {
  category: string
  excerpt: string
  featured: true
  subCategory: string
  tags: string[]
  title: string
  url: string

  image?: IImage
  imageComponent?: string
}

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
  articles: IArticle[]
  loggedIn: boolean | null
  loginFailed: boolean | null
  projects: IProjectLogo[]
  stuckPencil: boolean
  stuckPlayer: boolean
}

export const LOG_IN_CHECK_REQUEST = 'LOG_IN_CHECK_REQUEST'
export const LOG_IN_CHECK_RESULT = 'LOG_IN_CHECK_RESULT'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN_RESET_ERROR = 'LOG_IN_RESET_ERROR'
export const SET_STUCK_PENCIL = 'SET_STUCK_PENCIL'
export const SET_STUCK_PLAYER = 'SET_STUCK_PLAYER'

export interface ILogIn extends AnyAction {
  type: typeof LOG_IN
  payload: { email: string, password: string }
}

export interface ILogInCheckRequest extends AnyAction {
  type: typeof LOG_IN_CHECK_REQUEST
  payload: boolean
}

export interface ILogInCheckResult extends AnyAction {
  type: typeof LOG_IN_CHECK_RESULT
  payload: boolean
}

export interface ILogInResetError extends AnyAction {
  type: typeof LOG_IN_RESET_ERROR
  payload: null
}

export interface ILogOut extends AnyAction {
  type: typeof LOG_OUT
  payload: null
}

export interface ISetStuckPencil extends AnyAction {
  type: typeof SET_STUCK_PENCIL
  payload: boolean
}

export interface ISetStuckPlayer extends AnyAction {
  type: typeof SET_STUCK_PLAYER
  payload: boolean
}

export type Action =
  ILogIn
  | ILogInCheckRequest
  | ILogInCheckResult
  | ILogInResetError
  | ILogOut
  | ISetStuckPencil
  | ISetStuckPlayer
