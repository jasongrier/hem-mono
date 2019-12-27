import React, { ReactElement, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { IArticle } from '../../modules/articles'
import * as keyArtComponents from '../../components/art'

interface IProps {
  articles: IArticle[]

  className?: string
  heading?: string
  fourUp?: boolean
  displayCategory?: boolean
  displaySubcategory?: boolean
}

function ArticlesGrid({
  articles,

  children,
  className,
  displayCategory = false,
  displaySubcategory = false,
  fourUp = false,
  heading,
}: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className={classnames({
      'articles-grid': true,
      'articles-grid-four-up': fourUp,
      className,
    })}>
      <div className="articles-grid-content clearfix">
        <div className="articles-grid-pre-content">
          { heading && (
            <h2 className="articles-grid-heading">{ heading }</h2>
          )}
          { children }
        </div>
        { articles && articles.map(({ category, keyArtImage, keyArtComponent, keyArtComponentProps, title, subCategory, url }) => (
          <Link
            className="articles-grid-item"
            key={url}
            to={url}
          >
            <div className="articles-grid-item-image">
              {keyArtImage && (
                <img src={keyArtImage.url} alt={keyArtImage.alt} />
              )}
              {keyArtComponent && (
                React.createElement(keyArtComponents[keyArtComponent], keyArtComponentProps || {})
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
