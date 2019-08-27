import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Switch, Route, Link } from 'react-router-dom'
import InfoSheet from './InfoSheet'

function App(): ReactElement {
  const { articles } = useSelector((state: RootState) => ({
    articles: state.app.articles
  }))

  const tags = articles.reduce((acc, article) => {
    return acc.concat(article.tags)
  }, [] as any[])



  return (
    <div className="hem-application">
      <header>
        <h1>Jason Aaron Grier</h1>
      </header>
      <main>
        <section className="tags-filter">
        </section>
        <section className="articles-list">
          <ul>
            {articles.map(article => (
              <li className="articles-list__line">
                <Link to={`/${article.slug}`}>{article.title}</Link>
                <div className="articles-list__tags">
                  {article.tags.map(tag => (
                    <span>{tag}</span>
                  ))}
                </div>
              </li>
            ))}
            <li><Link to="/asdfasd">404</Link></li>
          </ul>
        </section>
      </main>
      <section className="info-sheet-container">
        <Switch>
          <Route path="/:articleId?" component={InfoSheet} />
        </Switch>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default App
