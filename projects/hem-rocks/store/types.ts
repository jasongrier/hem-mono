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
  category: string,
  excerpt: string,
  featured: true,
  image: IImage,
  tags: string[],
  title: string,
  url: string,
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
  carouselIndex: number
  carouselItems: ICarouselItem[]
  loggedIn: boolean | null
  loginFailed: boolean | null
  projects: IProjectLogo[]
}

export const CAROUSEL_NEXT = 'CAROUSEL_NEXT'
export const CAROUSEL_PREVIOUS = 'CAROUSEL_PREVIOUS'
export const CAROUSEL_SET_INDEX = 'CAROUSEL_SET_INDEX'
export const LOG_IN_CHECK_REQUEST = 'LOG_IN_CHECK_REQUEST'
export const LOG_IN_CHECK_RESULT = 'LOG_IN_CHECK_RESULT'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN_RESET_ERROR = 'LOG_IN_RESET_ERROR'

export interface ICarouselNext extends AnyAction {
  type: typeof CAROUSEL_NEXT
  payload: null
}

export interface ICarouselPrevious extends AnyAction {
  type: typeof CAROUSEL_PREVIOUS
  payload: null
}

export interface ICarouselSetIndex extends AnyAction {
  type: typeof CAROUSEL_SET_INDEX
  payload: number
}

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

export type Action =
  ICarouselNext
  | ICarouselPrevious
  | ICarouselSetIndex
  | ILogIn
  | ILogInCheckRequest
  | ILogInCheckResult
  | ILogInResetError
  | ILogOut
