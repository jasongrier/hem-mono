import React, { ReactElement } from 'react'
import Midst from '../components/midst-player-hack/Midst'
// import aShadeWhiter from '../assets/poems/a-shade-whiter'
import aShadeWhiter from '../assets/poems/angelo_whiter_NO_TITLE'
import alphabetSong from '../assets/poems/AnnelyseGelman_AlphabetSong_NO_TITLE'
import pool from '../assets/poems/pool'
import prosperity from '../assets/poems/prosperity'

const poemsJsData = {
  'a-shade-whiter': aShadeWhiter,
  'pool': pool,
  'prosperity': prosperity,
  'alphabet-song': alphabetSong,
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
