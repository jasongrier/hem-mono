import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { findIndex } from 'lodash'
import { RootState } from '../store'
import { Link } from 'react-router-dom'

interface IProps {
  match: any
}

function PoemNavLink({ match }: IProps): ReactElement {
  const { poems } = useSelector((state: RootState) => ({
    poems: state.app.poems,
  }))

  const currentPoemIndex = findIndex(poems, { slug: match.params.slug })
  const currentPoem = poems[currentPoemIndex]
  const previousPoem = poems[currentPoemIndex - 1]
  const nextPoem = poems[currentPoemIndex + 1]

  return (
    <>
      <Link className="poem-credit" to="http://google.com">
        <i className="author-name">{ currentPoem.author }</i>&nbsp;|&nbsp;{ currentPoem.title }
      </Link>

      <div id="poem-nav">
        { previousPoem &&
          <Link to={`/poem/${previousPoem.slug}/`}>Previous poem</Link>
        }

        { previousPoem && nextPoem && <>&nbsp;|&nbsp;</> }

        { nextPoem &&
          <Link to={`/poem/${nextPoem.slug}/`}>Next poem</Link>
        }
      </div>

      <div id="back-to-toc">
        <Link to="/read">Table of Contents</Link>
      </div>
    </>
  )
}

export default PoemNavLink
