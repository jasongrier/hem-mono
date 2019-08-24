import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, IArticle } from '../store'
import { Link } from '../../../../common/components'
import { autoParagraph } from '../../../../common/helpers'
import { useSeoMeta } from '../../../../common/hooks'

interface IProps {
  match: any
}

function InfoSheet({ match }: IProps): ReactElement {
  const { articleData } = useSelector((state: RootState) => ({
    articleData: state.app.articles[match.params.articleId] as IArticle
  }))

  if (!articleData) {
    return (
      // TODO: How should not found work with "real" 404's in the static render??
      <div>
        Not found!
      </div>
    )
  }

  const { title, text, links, seoMeta } = articleData

  useSeoMeta({
    title: 'Jason Grier | ' + title,
    ...seoMeta,
  })

  return (
    <div className="info-sheet">
      <h1>{title}</h1>
      <div className="info-sheet__text"
        dangerouslySetInnerHTML={{__html: autoParagraph(text)}}
      />
      <ul className="info-sheet__links">
        {links.map((link, i) => (
          <li key={i}>
            <Link {...link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfoSheet
