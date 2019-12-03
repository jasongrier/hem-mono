import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { ChevronButton } from '../../../lib/components/buttons'
import { BASE_SITE_PAGE_TITLE } from '../config'
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
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Read</title>
        <meta name="description" content="" />
      </Helmet>

      <section className="heroine">
        <div className="issue-date">Winter&nbsp;2019</div>
        <div className="issue-number">The Pilot Issue</div>
        <div className="editor-letter-toggle">Letter from the Editor</div>
        <div className="editor-letter">
          <div className="editor-button">
            <ChevronButton
              onClick={() => {}}
            />
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
              Future issues will have even more great features, and I welcome your comments and suggestions—feel free to reach out to midsthq@gmail.com. You can subscribe to our newsletter below and follow us at <a href="http://www.twitter.com/midstpoetry">@midstpoetry</a>.
              </p> 
              <p> 
              Happy reading!
              </p> 
              <p> 
                Annelyse
              </p> 
        </div>

        {poems.map((poem: IPoem) => (
          <Link key={poem.url}
            className="poem-link"
            data-trigger={poem.trigger ? 'true' : 'false'}
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
