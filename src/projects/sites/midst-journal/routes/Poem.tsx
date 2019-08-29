import React, { ReactElement } from 'react'
import Midst from '../components/midst-player-hack/Midst'
import aShadeWhiter from '../assets/poems/a-shade-whiter'
import poemB from '../assets/poems/poem-b'
import poemC from '../assets/poems/poem-c'

const poemsJsData = {
  'a-shade-whiter': aShadeWhiter,
  'poem-b': poemB,
  'poem-c': poemC,
} as any

interface IProps {
  match: any
}

function Poem({ match }: IProps): ReactElement {
  return (
    <div className="poem-page">
      <section className="heroine heroine--normal">
        <Midst
          isPlayer={true}
          MIDST_DATA_JS={poemsJsData[match.params.slug]}
          MIDST_DATA_JS_KEY={match.params.slug}
        />
      </section>
    </div>
  )
}

export default Poem
