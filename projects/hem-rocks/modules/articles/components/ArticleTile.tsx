import React, { ReactElement, PropsWithChildren } from 'react'
import * as keyArtComponents from '../../../packages/generative-art'
import { Link } from 'react-router-dom'
import { IArticle } from '../index'

export interface IProps {
  article: IArticle

  displayCategory?: boolean
  displaySubcategory?: boolean
}

function ArticleTile({
  article: {
    category,
    keyArtComponent,
    keyArtComponentProps,
    keyArtImage,
    subCategory,
    title,
    url,
  },

  displayCategory = false,
  displaySubcategory = false,
  children,
}: PropsWithChildren<IProps>): ReactElement {
  return (
    <Link
      className="article-tile"
      to={url}
    >
      <div className="article-tile-image">
        {keyArtImage && (
          <img src={keyArtImage.url} alt={keyArtImage.alt} />
        )}
        {keyArtComponent && (
          React.createElement(keyArtComponents[keyArtComponent], keyArtComponentProps || {})
        )}
      </div>
      <div className="article-tile-text">
        <strong className="article-tile-category">
          { displayCategory && (
            <span>{ category }</span>
          )}

          { displayCategory && displaySubcategory && ' –– '}

          { displaySubcategory && (
            <span>{ subCategory }</span>
          )}
        </strong>
        <h3>{ title }</h3>
        <div className="article-tile-extras">
          { children }
        </div>
      </div>
    </Link>
  )
}

export default ArticleTile
