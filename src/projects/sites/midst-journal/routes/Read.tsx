import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { IPoem } from '../store/types'
import { setMobileNavOpen } from '../store/actions'

function Read(): ReactElement {
  const { poems } = useSelector((state: RootState) => ({
    poems: state.app.poems,
  }))

  const dispatch = useDispatch()

  return (
    <div className="table-of-contents">
      <section className="heroine">
        <h2 style={{paddingTop: '20px'}}><strong>Pilot poems</strong></h2>
        {poems.map((poem: IPoem) => (
          <p key={poem.slug}>
            <Link
              className="poem-link"
              to={`/poem/${poem.slug}/`}
              onClick={() => dispatch(setMobileNavOpen(false))}
            >
              {`${poem.author}: ${poem.title}`}
            </Link>
          </p>
        ))}
        <p style={{paddingTop: '60px'}}>
        <small>[We’ll add more to this page as we get more sample poems.]</small></p>
      </section>
    </div>
  )
}

export default Read
