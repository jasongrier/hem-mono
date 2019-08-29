import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Route, Link } from 'react-router-dom'
import { TagFilter, TaggedSubjectsList } from '../../../../common/packages/tag'
import { Exclude } from '../../../../common/components'
import InfoSheet from './InfoSheet'
import { renderArticleListLine } from './ArticleListLine'

function App(): ReactElement {
  const { articles } = useSelector((state: RootState) => ({
    articles: state.app.articles
  }))

  return (
    <div className="hem-application">
      <header>
        <h1>
          <Link to="/">
            Jason Aaron Grier
          </Link>
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
        <Exclude from="/category/:name">
          <Route path="/:articleId?" component={InfoSheet} />
        </Exclude>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default App
