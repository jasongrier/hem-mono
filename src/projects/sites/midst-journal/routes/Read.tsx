import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { IPoem } from '../store/types'
import { setMobileNavOpen } from '../store/actions'

function Read(): ReactElement {
  const { poems } = useSelector((state: RootState) => ({
    poems: state.app.poems.filter(poem => !poem.hidden),
  }))

  const dispatch = useDispatch()

  return (
    <div className="table-of-contents">
      <section className="heroine">
        <div className="issue-date">Winter&nbsp;2019</div>
        <div className="issue-number">The Pilot Issue</div>
        {poems.map((poem: IPoem) => (
          <Link key={poem.url}
            className="poem-link"
            to={`/poem/${poem.url}/`}
            onClick={() => dispatch(setMobileNavOpen(false))}
          >
            <div className="poem-link__column poem-author">{poem.author}</div>
            <div className="poem-link__column poem-title">{poem.title}</div>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Read
