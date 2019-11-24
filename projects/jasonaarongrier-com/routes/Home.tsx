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
    <div className="page page-home">
      <Helmet>
        <title>Jason Aaron Grier</title>
        <meta name="description" content="" />
      </Helmet>
      <header>
        <h1>Jason Aaron Grier</h1>
        <div className="page-home__contact-links">
          <a href="mailto:j@hem.rocks">j@hem.rocks</a>&nbsp;| &nbsp;
          <a href="http://instagram.com/hem.rocks">@hem.rocks</a>
        </div>
        <nav className="page-home__page-links">
          <Link to="/cv">CV</Link>
          <Link to="/press">Press</Link>
        </nav>
      </header>
      <main>
        <div className="items-list">
          <header className="items-list__header">
            <div className="items-list__column-header items-list-column-header--first"></div>
            <div className="items-list-column-header items-list-column-header--second">tags</div>
            <div className="items-list-column-header items-list-column-header--third">date</div>
          </header>
          <ul className="items-list__items">
            {items.map(item => (
              <li
                key={item.id}
                className="items-list__item"
              >
                <div className="items-list__item-cell items-list__item-cell--first">
                  {item.title}
                </div>
                <div className="items-list__item-cell items-list__item-cell--second">
                  {item.tags.map(tag => (
                    <Link
                      className="items-list__tag"
                      key={tag.id}
                      to={`/${tag.name}`}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
                <div className="items-list__item-cell items-list__item-cell--third">
                  {item.date}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer>
        <p className="page-home__footer-small-text">&copy; 2020 Jason Aaron Grier</p>
      </footer>
    </div>
  )
}

export default Home
