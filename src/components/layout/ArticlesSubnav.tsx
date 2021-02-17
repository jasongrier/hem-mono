import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { assetHostHostname } from '../../functions'

function ArticlesSubnav(): ReactElement {
  return (
    <nav className="main-content-subnav">
      <ul>
        <li>
          <NavLink
            isActive={(_, { pathname }) =>
              pathname.indexOf('/articles') === 0
              && !pathname.includes('blog')
              && !pathname.includes('news')
            }
            to="/articles"
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ArticlesSubnav
