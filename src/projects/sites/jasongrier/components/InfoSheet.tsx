import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Link } from '../../../../common/components'
import { autoParagraph } from '../../../../common/functions'
import { Helmet } from 'react-helmet'

interface IProps {
  match: any
}

function InfoSheet({ match }: IProps): ReactElement {
  let { articleData } = useSelector((state: RootState) => ({
    articleData: state.app.articles.find(article => article.slug === match.params.articleId)
  }))

  if (!articleData) {
    articleData = {
      slug: 'not-found',
      title: 'Sorry',
      text: 'Can\*t find what you\'re looking for\n\nTry closing this box and then explore the links below',
      tags: [],
      links: [],
      description: '',
    }
  }

  const isHome = match.url === '/'

  let pageTitle, pageDescription
  if (isHome) {
    pageTitle = 'Jason Grier | Home'
    pageDescription = ''
  }

  else {
    pageTitle = 'Jason Grier | ' + articleData.title
    pageDescription = articleData.description
  }

  return (
    <div className={`info-sheet${!isHome ? ' info-sheet--open' : ''}`}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
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
