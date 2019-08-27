import { ILink } from '../../../../common/components'

export interface IArticle {
  slug: string
  title: string
  text: string
  tags: string[]
  links: ILink[]
  description: string
}

export interface IState {
  articles: IArticle[]
}
