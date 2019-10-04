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
        {nextPoem ?
          <Link
            to={`/poem/${nextPoem.slug}/`}>
            <i className="arrow arrow-forward"></i>
          </Link>
          :
          <a className='disabled'>
            <i className="arrow arrow-forward"></i>
          </a>
        }

        {previousPoem ?
          <Link
            to={`/poem/${previousPoem.slug}/`}>
            <i className="arrow arrow-back"></i>
          </Link>
          :
          <a className="disabled">
            <i className="arrow arrow-back"></i>
          </a>
        }
      </div>

      <div id="back-to-toc">
        <Link to="/read">Table of Contents</Link>
      </div>
    </>
  )
}

export default PoemNavLink
