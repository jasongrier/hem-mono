import React, { ReactElement } from 'react'
import { GrandPianoHeroine } from '../components/heroines'

function Home(): ReactElement {
  return (
    <div className="page page-home">
      <div className="main-heroine">
        <GrandPianoHeroine />
      </div>

      <div className="pricing-banner" hidden>
        Pay what you can. All devices run in Ableton Live Lite
      </div>
    </div>
  )
}

export default Home
