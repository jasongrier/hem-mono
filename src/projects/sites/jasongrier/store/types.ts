import { ILink } from '../../../../common/components'

export interface IArticle {
  title: string
  text: string
  links: ILink[]
}

export interface IState {
  articles: { [articleId: string]: IArticle }
}
