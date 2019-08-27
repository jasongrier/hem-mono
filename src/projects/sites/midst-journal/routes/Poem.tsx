import React, { ReactElement } from 'react'

interface IProps {
  match: any
}

function Poem({ match }: IProps): ReactElement {
  return (
    <div className="poem-page">
      <section className="heroine heroine--normal">
        {match.params.slug}
      </section>
    </div>
  )
}

export default Poem
