import React, { ReactElement } from 'react'
import { GrandPianoHeroine } from '../components/heroines'

function Home(): ReactElement {
  return (
    <div className="page page-home">
      <div className="main-heroine">
        <GrandPianoHeroine />
      </div>
    </div>
  )
}

export default Home
