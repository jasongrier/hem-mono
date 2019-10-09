import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { findIndex } from 'lodash'
import { RootState } from '../store'
import { setProcessNoteOpen } from '../store/actions'

interface IProps {
  match: any
}

function PoemNavLink({ match }: IProps): ReactElement {
  const { poems, processNoteOpen } = useSelector((state: RootState) => ({
    poems: state.app.poems,
    processNoteOpen: state.app.processNoteOpen,
  }))

  const dispatch = useDispatch()

  const currentPoemIndex = findIndex(poems, { slug: match.params.slug })
  const currentPoem = poems[currentPoemIndex]
  const previousPoem = poems[currentPoemIndex - 1]
  const nextPoem = poems[currentPoemIndex + 1]

  return (
    <>
      <a className="poem-credit">
        <span onClick={() => dispatch(setProcessNoteOpen(!processNoteOpen))}>
          <i className="author-name">
            { currentPoem.author }
          </i>
          &nbsp;|&nbsp;
          <span className="poem-title">
            { currentPoem.title }
          </span>
        </span>
      </a>

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
