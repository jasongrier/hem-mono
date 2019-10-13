import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { IArticle } from '../store'

interface IProps {
  article: IArticle
}

function ArticleListLine({ article }: IProps): ReactElement {
  return (
    <li
      key={article.slug}
      className="articles-list__line"
    >
      <Link to={`/${article.slug}`}>{article.title}</Link>
      <div className="articles-list__tags">
        {article.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </li>
  )
}

export function renderArticleListLine(article: IArticle) {
  return (
    <ArticleListLine
      key={article.slug}
      article={article}
    />
  )
}

export default ArticleListLine
