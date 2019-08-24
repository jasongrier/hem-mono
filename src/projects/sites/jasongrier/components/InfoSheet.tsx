import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState, IArticle } from '../store'
import { Link } from '../../../../common/components'
import { autoParagraph } from '../../../../common/helpers'
import { useSeoMeta } from '../hooks'

interface IProps {
  match: any
}

function InfoSheet({ match }: IProps): ReactElement {
  const { articleData } = useSelector((state: RootState) => ({
    articleData: state.app.articles[match.params.articleId] as IArticle
  }))

  const isHome = match.path === '/'

  useSeoMeta({
    path: match.path,
    articleData,
  })

  if (!isHome && !articleData) {
    return (
      // TODO: How should not found work with "real" 404's in the static render??
      <div>
        Not found!
      </div>
    )
  }

  return (
    <div className={`info-sheet${!isHome ? ' info-sheet--open' : ''}`}>
      {!isHome && (
        <>
          <h1>{articleData.title}</h1>
          <div className="info-sheet__text"
            dangerouslySetInnerHTML={{__html: autoParagraph(articleData.text)}}
          />
          <ul className="info-sheet__links">
            {articleData.links.map((link, i) => (
              <li key={i}>
                <Link {...link} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default InfoSheet
