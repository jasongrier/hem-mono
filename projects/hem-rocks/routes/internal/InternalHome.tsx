import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ProtectedContent } from '../../modules/login'
import { BASE_SITE_TITLE } from '../../config'

function InternalHome(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-internal page-internal-home clearfix">
        <ProtectedContent>
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
            </ul>
          </div>

          <div className="page-internal-link-group">
            <h2>Admin</h2>
            <ul>
              <li><Link to="/internal/calendar">Calendar</Link></li>
              <li><Link to="/internal/todos">Todos</Link></li>
              <li><Link to="/internal/notes">Notes</Link></li>
            </ul>
          </div>

          <div className="page-internal-link-group">
            <h2>Emails</h2>
            <ul>
              <li><a href="https://cpanel-box5192.bluehost.com/cpsess8587732583/frontend/bluehost/mail/webmailform.html?user=j%40hem.rocks&return_request_uri=%2Fcpsess8587732583%2Ffrontend%2Fbluehost%2Femail_accounts%2Findex.html" target="_blank">j@hem.rocks</a></li>
              <li><a href="https://cpanel-box5192.bluehost.com/cpsess8587732583/frontend/bluehost/mail/webmailform.html?user=j%40hemberlin.de&return_request_uri=%2Fcpsess8587732583%2Ffrontend%2Fbluehost%2Femail_accounts%2Findex.html" target="_blank">j@hemberlin.de</a></li>
              <li><a href="https://cpanel-box5192.bluehost.com/cpsess8587732583/frontend/bluehost/mail/webmailform.html?user=info%40berlinstockphotos.com&return_request_uri=%2Fcpsess8587732583%2Ffrontend%2Fbluehost%2Femail_accounts%2Findex.html" target="_blank">info@berlinstockphotos.com</a></li>
            </ul>
          </div>

          <div className="page-internal-link-group">
            <h2>Sandbox</h2>
            <ul>
              <li><Link to="/internal/sandbox">Sandbox</Link></li>
              <li><Link to="/internal/docus">Docus</Link></li>
            </ul>
          </div>

          <div className="page-internal-link-group">
            <h2>Print a flip book</h2>
            <ul>
              <li>
                <a
                  href="/internal/print-flip-books"
                  target="_blank"
                >
                  Print flip books
                </a>
              </li>
            </ul>
          </div>
        </ProtectedContent>
      </div>
    </>
  )
}

export default InternalHome
