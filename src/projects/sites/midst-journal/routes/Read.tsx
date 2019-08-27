import React, { ReactElement } from 'react'

function Read(): ReactElement {
  return (
    <div className="table-of-contents">
      <section className="heroine">
        <h2 style={{paddingTop: '20px'}}><strong>Pilot poems</strong></h2>
        <p><a className="poem-link" href="/poem/a-shade-whiter/">Angelo Colavita: A Shade Whiter</a></p>
        <p><a className="poem-link" href="/poem/poem-b/">Author B: Poem B</a></p>
        <p><a className="poem-link" href="/poem/poem-c/">Author C: Poem C</a></p>
        <p style={{paddingTop: '60px'}}>
        <small>[We’ll add more to this page as we get more sample poems.]</small></p>
      </section>
    </div>
  )
}

export default Read
