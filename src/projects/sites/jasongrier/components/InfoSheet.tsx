import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState, IArticle } from '../store'
import { Link } from '../../../../common/components'
import { autoParagraph } from '../../../../common/helpers'

interface IProps {
  articleId: string
}

function InfoSheet({ articleId }: IProps): ReactElement {
  const { articleData } = useSelector((state: RootState) => ({
    articleData: state.app.articles[articleId] as IArticle,
  }))

  const { title, text, links } = articleData

  return (
    <div className="info-sheet">
      <h1>{title}</h1>
      <div className="info-sheet__text"
        dangerouslySetInnerHTML={{__html: autoParagraph(text)}}
      />
      <ul className="info-sheet__links">
        {links.map(link => (
          <li>
            <Link {...link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfoSheet
