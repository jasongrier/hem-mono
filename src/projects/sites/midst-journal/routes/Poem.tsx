import React, { ReactElement } from 'react'
import Midst from '../components/midst-player-hack/Midst'

interface IProps {
  match: any
}

function Poem({ match }: IProps): ReactElement {
  return (
    <div className="poem-page">
      <section className="heroine heroine--normal">
        <Midst
          isPlayer={true}
          MIDST_DATA_URL='http://midst-player-data:8888/angelocolavita-ashadewhiter.midst'
        />
      </section>
    </div>
  )
}

export default Poem
