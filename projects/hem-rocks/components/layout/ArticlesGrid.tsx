import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { IArticle } from '../../store/types'

interface IProps {
  articles: IArticle[]

  heading?: string
}

function ArticlesGrid({ articles, heading }: IProps): ReactElement {
  return (
    <div className="articles-grid">
      <div className="articles-grid-content clearfix">
        { heading && (
          <h2 className="articles-grid-heading">{ heading }</h2>
        )}
        { articles && articles.map(({ category, image, title, url }, index) => (
          <Link
            className="articles-grid-item"
            key={url}
            to={url}
          >
            <div className="articles-grid-item-image">
              <img src={image.url} alt={image.alt} />
            </div>
            <div className="articles-grid-item-text">
              <strong className="articles-grid-item-category">
                { category }
              </strong>
              <h3>{ title }</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ArticlesGrid
