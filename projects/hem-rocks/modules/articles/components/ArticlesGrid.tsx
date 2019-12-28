import React, { ReactElement, PropsWithChildren, SFC } from 'react'
import * as keyArtComponents from '../../../packages/generative-art'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { IArticle } from '../index'
import ArticleTile, { IProps as ArticleTileProps } from './ArticleTile'

// TODO: All props interfaces should be exported
export interface IProps {
  articles: IArticle[]

  className?: string
  heading?: string
  fourUp?: boolean
  displayCategory?: boolean
  displaySubcategory?: boolean
  useTile?: SFC<ArticleTileProps>
}

function ArticlesGrid({
  articles,

  children,
  className,
  displayCategory = false,
  displaySubcategory = false,
  fourUp = false,
  heading,
  useTile = ArticleTile,
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
        { articles && articles.map(article => (
          React.createElement(useTile, {
            article,
            key: article.url,
          })
        ))}
      </div>
    </div>
  )
}

export default ArticlesGrid
