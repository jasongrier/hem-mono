import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setMobileNavOpen } from '../store/actions'

function Read(): ReactElement {
  const dispatch = useDispatch()

  return (
    <div className="table-of-contents">
      <section className="heroine">
        <h2 style={{paddingTop: '20px'}}><strong>Pilot poems</strong></h2>
        <p>
          <Link
            className="poem-link"
            to="/poem/a-shade-whiter/"
            onClick={() => dispatch(setMobileNavOpen(false))}
          >
            Angelo Colavita: A Shade Whiter
          </Link>
        </p>
        <p>
          <Link
            className="poem-link"
            to="/poem/poem-b/"
            onClick={() => dispatch(setMobileNavOpen(false))}
          >
              Author B: Poem B
          </Link>
        </p>
        <p>
          <Link
            className="poem-link"
            to="/poem/poem-c/"
            onClick={() => dispatch(setMobileNavOpen(false))}
          >
              Author C: Poem C
          </Link>
        </p>
        <p style={{paddingTop: '60px'}}>
        <small>[We’ll add more to this page as we get more sample poems.]</small></p>
      </section>
    </div>
  )
}

export default Read
