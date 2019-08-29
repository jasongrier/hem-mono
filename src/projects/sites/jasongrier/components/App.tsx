import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { getTagsCounts } from '../helpers'
import { Switch, Route, Link } from 'react-router-dom'
import InfoSheet from './InfoSheet'
import { Hide } from '../../../../common/components';

function App(): ReactElement {
  const { articles } = useSelector((state: RootState) => ({
    articles: state.app.articles
  }))

  const tags = getTagsCounts(articles)

  return (
    <div className="hem-application">
      <header>
        <h1>Jason Aaron Grier</h1>
      </header>
      <main>
        <section className="tags-filter">
          {tags.map(tag => (
            <>
              <Hide on={`/category/${tag.name}`}>
                <Link
                  key={tag.name}
                  to={`/category/${tag.name}`}
                >
                  {tag.name}
                </Link>
                <Link
                  key={tag.name}
                  to="/"
                >
                  {tag.name}
                </Link>
              </Hide>
            </>
          ))}
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
