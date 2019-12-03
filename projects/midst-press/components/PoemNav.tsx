import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { findIndex } from 'lodash'
import { RootState } from '../store'
import { setProcessNoteOpen } from '../store/actions'

interface IProps {
  history: any
  match: any
}

function PoemNav({ history, match }: IProps): ReactElement {
  const { poems, processNoteOpen } = useSelector((state: RootState) => ({
    poems: state.app.poems,
    processNoteOpen: state.app.processNoteOpen,
  }))

  const dispatch = useDispatch()

  const currentPoemIndex = findIndex(poems, { url: match.params.poemUrl })
  const currentPoem = poems[currentPoemIndex]
  const previousPoem = poems[currentPoemIndex - 1]
  const nextPoem = poems[currentPoemIndex + 1]
  const nextPoemUrl = nextPoem && `/poem/${nextPoem.url}/`
  const previousPoemUrl = previousPoem && `/poem/${previousPoem.url}/`

  useEffect(() => {
    function slidePoemOnArrowKeyDown(evt: any) {
      if (evt.keyCode === 37) {
        history.push(previousPoemUrl)
      }

      else if (evt.keyCode === 39) {
        history.push(nextPoemUrl)
      }
    }

    document.addEventListener('keydown', slidePoemOnArrowKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', slidePoemOnArrowKeyDown)
    }
  }, [nextPoemUrl, previousPoemUrl])

  return (
    <>
      <a className="poem-credit">
        <span onClick={() => dispatch(setProcessNoteOpen(!processNoteOpen))}>
          <i className="author-name">
            { currentPoem.author }
          </i>
          <span className="divider">
            &nbsp;|&nbsp;
          </span>
          <span className="poem-title">
            { currentPoem.title }
          </span>
        </span>
      </a>

      <div id="poem-nav">
        {nextPoem ?
          <Link
            to={nextPoemUrl}>
            <i className="arrow arrow-forward"></i>
          </Link>
          :
          <a className="disabled">
            <i className="arrow arrow-forward"></i>
          </a>
        }

        {previousPoem ?
          <Link
            to={previousPoemUrl}>
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

export default withRouter(PoemNav)
