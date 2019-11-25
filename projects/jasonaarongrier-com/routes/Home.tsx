import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { RootState } from '../store'

function Home(): ReactElement {
  const { items } = useSelector((state: RootState) => ({
    items: state.app.items,
  }))

  const dispatch = useDispatch()

  return (
    <div className="page home">
      <Helmet>
        <title>Jason Aaron Grier</title>
        <meta name="description" content="" />
      </Helmet>
      <header>
        <div className="header-contact-links">
          <ul>
            <li>
              <a href="mailto:j@hem.rocks">j@hem.rocks</a>
            </li>
            <li>
              <a href="https://instagram.com/hem.rocks">@hem.rocks</a>
            </li>
          </ul>
        </div>
        <nav className="secondary-page-links">
          <ul>
            <li>
              <Link to="/cv">CV</Link>
            </li>
            <li>
              <Link to="/press">Press</Link>
            </li>
            <li>
              <Link to="/react-dev">Hire me</Link>
            </li>
            <li>
              <a href="https://studio.hem.rocks">Studio</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="items-list">
          <header>
            <div className="column-header"></div>
            <div className="column-header">tags</div>
            <div className="column-header">date</div>
          </header>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <div className="item-cell">
                  {item.title}
                </div>
                <div className="item-cell">
                  {item.tags.map(tag => (
                    <Link
                      className="item-tag"
                      key={tag.id}
                      to={`/${tag.name}`}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
                <div className="item-cell">
                  {item.date}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer>
        <p className="small-text">&copy; 2020 Jason Aaron Grier</p>
      </footer>
    </div>
  )
}

export default Home
