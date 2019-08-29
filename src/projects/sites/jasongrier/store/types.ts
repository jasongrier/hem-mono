import { ILink } from '../../../../common/components'
import { ITaggedSubject } from '../../../../common/packages/tag'

export interface IArticle extends ITaggedSubject {
  slug: string
  title: string
  text: string
  links: ILink[]
  description: string
}

export interface IState {
  articles: IArticle[]
}
