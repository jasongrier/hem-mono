import React, { ReactElement } from 'react'
import Midst from '../components/midst-player-hack/Midst'

const poemsJsData = {
  'a-shade-whiter': require('../assets/poems/angelo_whiter_NO_TITLE'),
  'pool': require('../assets/poems/pool'),
  'prosperity': require('../assets/poems/prosperity'),
  'alphabet-song': require('../assets/poems/AnnelyseGelman_AlphabetSong_NO_TITLE'),
  'untitled-hedgie': require('../assets/poems/untitled-hedgie'),
  'veronica-martin-epilogue-in-summer': require('../assets/poems/veronica-martin-epilogue-in-summer'),
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
