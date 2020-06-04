import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../../config'

function InternalHome(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-internal page-internal-home clearfix">
        <h1>Internal Pages</h1>

        <div className="page-internal-link-group">
          <h2>All Content Types</h2>
          <ul>
            <li>
              <Link to="apps">Apps</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="articles">Articles</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="code">Code</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="label">Label</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="mixes">Mixes</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="press">Press</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="press-kits">Press Kits</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="sound-library">Sound Library</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="tracks">Tracks</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="tutorials">Tutorials</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="video">Videos</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="venue-archive">Venue Archive</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="venue-calendar">Venue Calendar</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <Link to="venue-merch">Venue Merch Table</Link>
              <p>Lorem ipsum dolor sit amet</p>
            </li>
          </ul>

          <h3>Utility Types</h3>
          <ul>
            <li>
              List
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              Playlist
              <p>Lorem ipsum dolor sit amet</p>
            </li>
          </ul>
        </div>

        <div className="page-internal-link-group">
          <h2>Midst 2020</h2>
          <ul>
            <li>
              <Link to="/">Midst 2020 General Info</Link>
            </li>
            <li>
              <Link to="/">Midst 2020 Proposal</Link>
            </li>
            <li>
              <Link to="/">Midst 2020 Budget</Link>
            </li>
            <li>
              <Link to="/">Midst 2020 Updates</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default InternalHome
