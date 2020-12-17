import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { sortBy, reverse } from 'lodash'
import { ChevronButton } from '../../../lib/packages/hem-buttons'
import { BASE_SITE_PAGE_TITLE } from '../config'
import { RootState } from '../store'
import { IPoem } from '../store/types'
import { setMobileNavOpen, setSortTerm, reverseSortOrder } from '../store/actions'

function Read(): ReactElement {
  const { poems, sortTerm, sortOrder } = useSelector((state: RootState) => ({
    poems: state.app.poems.filter(poem => !poem.hidden),
    sortTerm: state.app.sortTerm,
    sortOrder: state.app.sortOrder,
  }))

  const dispatch = useDispatch()

  const [editorLetterOpen, setEditorLetterOpen] = useState(false)

  useEffect(() => {
    // TODO: React "call on an unmounted component" warning
    // 1) Open/close the editor note
    // 2) Go to a poem and open/close the process note
    // 3) Go home
    // 4) Go back here and open/close the editor note, using ESC
    document.body.addEventListener('keydown', closeEditorLetter)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeEditorLetter)
    }
  }, [])

  function closeEditorLetter(evt: any) {
    if (evt.keyCode === 27) {
      setEditorLetterOpen(false)
    }
  }

  let finalPoems = sortBy(poems, sortTerm)

  if (sortOrder === 'ASC') {
    finalPoems = reverse(finalPoems)
  }

  return (
    <div className="table-of-contents">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Read</title>
        <meta name="description" content="" />
      </Helmet>

      <section className="heroine clearfix">
        <div
          className="editor-letter-toggle"
          onClick={() => setEditorLetterOpen(!editorLetterOpen)}
        >
          Letter from the Editor
        </div>
        <div className="editor-letter-container">
          <div className={`
            editor-letter
            ${editorLetterOpen ? 'editor-letter-open' : ''}
          `}>
            <div className="editor-button">
              <ChevronButton onClick={() => setEditorLetterOpen(!editorLetterOpen)} />
            </div>
            <p> Dear friends,</p>
            <p>
              Welcome to the debut issue of Midst! I've been fascinated with this concept—a journal that would let you see exactly how each of its poems were written—for years, and am so excited for you to finally see the first examples of brand-new works-in-process from these extraordinarily brave poets.
            </p>
            <p>
              Inside, you'll find prose poetry, hyper-sparse forms, imitations, poetry in Korean (with both its initial process <i>and</i> the process of its translation), and more. Some of these poems
              are remarkably straightforward in their development, seeming to spill out all at once, intact; others
              evolve through long, winding strings of text that beautifully showcase the interplay of "writing" and "editing".
            </p>
            <p>
              Future issues will have even more great features, and I welcome your comments and suggestions—feel free to reach out to midsthq@gmail.com. This is just the beginning. You can subscribe to our newsletter below and follow us at <a href="http://www.twitter.com/midstpoetry">@midstpoetry</a>.
            </p>
            <p>
              Happy reading!
            </p>
            <p>
              Annelyse
            </p>
          </div>
        </div>

        <div className="poem-line poem-head">
          <div className="poem-line__column poem-author">
            <span
              className={`
                poem-head-arrow
                ${ sortTerm === 'authorId' ? 'poem-head-arrow-active' : ''}
                ${ sortTerm === 'authorId' && sortOrder === 'ASC' ? 'poem-head-arrow-up' : ''}
              `}
              onClick={() => {
                if (sortTerm === 'authorId') {
                  dispatch(reverseSortOrder())
                }

                else {
                  dispatch(setSortTerm('authorId'))
                }
              }}
            />
          </div>
          <div className="poem-line__column poem-title">
            <span
              className={`
                poem-head-arrow
                ${ sortTerm === 'slug' ? 'poem-head-arrow-active' : ''}
                ${ sortTerm === 'slug' && sortOrder === 'ASC' ? 'poem-head-arrow-up' : ''}
              `}
              onClick={() => {
                if (sortTerm === 'slug') {
                  dispatch(reverseSortOrder())
                }

                else {
                  dispatch(setSortTerm('slug'))
                }
              }}
            />
          </div>
          <div className="poem-line__column poem-date">
            <span
              className={`
                poem-head-arrow
                ${ sortTerm === 'date' ? 'poem-head-arrow-active' : ''}
                ${ sortTerm === 'date' && sortOrder === 'ASC' ? 'poem-head-arrow-up' : ''}
              `}
              onClick={() => {
                if (sortTerm === 'date') {
                  dispatch(reverseSortOrder())
                }

                else {
                  dispatch(setSortTerm('date'))
                }
              }}
            />
          </div>
        </div>

        {finalPoems.map((poem: IPoem) => (
          <Link key={poem.url}
            className={`
              poem-line
              ${ poem.highlighted ? 'poem-highlighted' : '' }
            `}
            data-trigger={poem.trigger ? 'true' : 'false'}
            to={`/poem/${poem.url}/`}
            onClick={() => dispatch(setMobileNavOpen(false))}
          >
            { poem.badge && (
              <div className="poem-badge">{ poem.badge }</div>
            )}
            <div className="poem-line__column poem-author">{poem.author}</div>
            <div
              className="poem-line__column poem-title"
              dangerouslySetInnerHTML={{ __html: poem.title }}
            />
            <div className="poem-line__column poem-date">
              { poem.date.format('MM/DD/YYYY') }
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Read
