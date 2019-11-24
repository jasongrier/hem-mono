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
          <a href="mailto:j@hem.rocks">j@hem.rocks</a>&nbsp;| &nbsp;
          <a href="http://instagram.com/hem.rocks">@hem.rocks</a>
        </div>
        <nav className="secondary-page-links">
          <Link to="/cv">CV</Link>
          <Link to="/press">Press</Link>
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
