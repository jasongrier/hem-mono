import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { IArticle } from '../../store/types'
import * as uiComponents from '../../components/ui'

interface IProps {
  articles: IArticle[]

  className?: string
  heading?: string
  fourUp?: boolean
  displayCategory?: boolean
  displaySubcategory?: boolean
}

function ArticlesGrid({ articles, className, heading, fourUp = false, displayCategory = false, displaySubcategory = false }: IProps): ReactElement {
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
        { articles && articles.map(({ category, image, imageComponent, title, subCategory, url }, index) => (
          <Link
            className="articles-grid-item"
            key={url}
            to={url}
          >
            <div className="articles-grid-item-image">
              {image && (
                <img src={image.url} alt={image.alt} />
              )}
              {imageComponent && (
                React.createElement(uiComponents[imageComponent])
              )}
            </div>
            <div className="articles-grid-item-text">
              <strong className="articles-grid-item-category">
                { displayCategory && (
                  <span>
                    { category }
                  </span>
                )}

                { displayCategory && displaySubcategory && ' –– '}

                { displaySubcategory && (
                  <span>
                    { subCategory }
                  </span>
                )}
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
