import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function PoemNavLink(): ReactElement {
  const previousPoem = {
    slug: 'foo'
  }

  const nextPoem = {
    slug: 'foo'
  }

  const hasPreviousPoem = true
  const hasNextPoem = true

  return (
    <>
      <Link className="poem-credit" to="http://google.com">
        <i className="author-name">Angelo Colavita</i>&nbsp;|&nbsp;A Shade Whiter
      </Link>

      <div id="poem-nav">
        { hasPreviousPoem &&
          <Link to={`/poem/${previousPoem.slug}/`}>Previous poem</Link>
        }

        { hasPreviousPoem && hasNextPoem && <>&nbsp;|&nbsp;</> }

        { hasNextPoem &&
          <Link to={`/poem/${nextPoem.slug}/`}>Next poem</Link>
        }
      </div>

      <div id="back-to-toc">
        <a href="/table-of-contents">Table of Contents</a>
      </div>
    </>
  )
}

export default PoemNavLink
