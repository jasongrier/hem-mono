import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState, IArticle } from '../store'
import { Switch, Route } from 'react-router-dom'
import { TagFilter, TaggedSubjectsList } from '../../../../common/packages/tag'
import InfoSheet from './InfoSheet'
import ArticleListLine from './ArticleListLine'

function App(): ReactElement {
  const { articles } = useSelector((state: RootState) => ({
    articles: state.app.articles
  }))

  return (
    <div className="hem-application">
      <header>
        <h1>Jason Aaron Grier</h1>
      </header>
      <main>
        <section className="tags-filter">
          <TagFilter subjects={articles} />
        </section>
        <section className="articles-list">
          <ul>
            <TaggedSubjectsList
              subjects={articles}
              renderSubject={(article: IArticle) => (
                <ArticleListLine
                  key={article.slug}
                  article={article}
                />
              )}
            />
          </ul>
        </section>
      </main>
      <section className="info-sheet-container">
        <Switch>
          <Route exact path="/category/:name" component={() => <></>} />
          <Route path="/:articleId?" component={InfoSheet} />
        </Switch>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default App
