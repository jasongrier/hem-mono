import { ILink } from '../../../../common/components'

export interface IArticle {
  title: string
  text: string
  links: ILink[]
  seoMeta: {
    description: string
    keywords: string
  }
}

export interface IState {
  articles: { [articleId: string]: IArticle }
}
