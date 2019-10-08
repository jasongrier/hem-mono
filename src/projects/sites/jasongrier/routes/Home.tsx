import React, { ReactElement } from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { TagFilter, TaggedSubjectsList } from '../../../../common/packages/tag'
import { Hide } from '../../../../common/components'
import InfoSheet from '../components/InfoSheet'
import { renderArticleListLine } from '../components/ArticleListLine'

function Home(): ReactElement {
  const { articles } = useSelector((state: RootState) => ({
    articles: state.app.articles
  }))

  return (
    <div className="home-page">
      <header>
        <h1>
          <Link to="/">JG</Link>
        </h1>
      </header>
      <main>
        <section className="tags-filter">
          <TagFilter subjects={articles} />
        </section>
        <section className="articles-list">
          <ul>
            <TaggedSubjectsList
              subjects={articles}
              renderSubject={renderArticleListLine}
            />
          </ul>
        </section>
      </main>
      <section className="info-sheet-container">
        <Hide from="/category/:name">
          <Route path="/:articleId?" component={InfoSheet} />
        </Hide>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default Home