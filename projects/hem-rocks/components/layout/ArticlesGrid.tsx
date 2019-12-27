import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { IArticle } from '../../store/types'

interface IProps {
  articles: IArticle[]

  className?: string
  heading?: string
  fourUp?: boolean
}

function ArticlesGrid({ articles, className, heading, fourUp = false}: IProps): ReactElement {
  return (
    <div className={classnames({
      'articles-grid': true,
      'articles-grid-four-up': fourUp,
      className,
    })}>
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
