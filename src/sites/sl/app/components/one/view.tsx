import React, { ReactElement } from 'react'
import './style.css'

const shortDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tristique risus id est congue, vel fringilla urna pulvinar.'
const samplePacks = [
  { name: 'Antique Piano', shortDescription },
  { name: 'Berlin Fireworks', shortDescription },
  { name: 'Cymbals', shortDescription },
  { name: 'Demonstration', shortDescription },
  { name: 'Grand Piano', shortDescription },
  { name: 'Grand Piano Extended', shortDescription },
  { name: 'Guitars', shortDescription },
  { name: 'Mic Feedback', shortDescription },
  { name: 'No-Input Mixer', shortDescription },
  { name: 'Noise Reduction Artefacts', shortDescription },
  { name: 'Outtakes', shortDescription },
  { name: 'Photo Sonifications', shortDescription },
  { name: 'Record Endings', shortDescription },
  { name: 'Studio Gear', shortDescription },
  { name: 'Viola', shortDescription }
]

function OneView(): ReactElement {
  return (
    <div className="one">
      <div className="list-filters">{/** TODO: Reusable list-filter component  */}
        <div className="list-filter active">Extended technique</div>
        <div className="list-filter">Sonic detritus</div>
        <div className="list-filter">Instrument</div>
        <div className="list-filter">One-shots</div>
      </div>
      <div className="sample-packs-list">
        {samplePacks.map(({ name, shortDescription }) =>
          <div className="sample-pack-line">
            <h3>{name}</h3>
            <p>{shortDescription}</p>
            <button className="expose-playlist-button">Demonstration</button>
            <div className="demonstrations">
              <div>Lorem Ipsum Dolor by Foo Barbaz</div>
              <div>Lorem Ipsum Dolor by Foo Barbaz</div>
              <div>Lorem Ipsum Dolor by Foo Barbaz</div>
              <div>Lorem Ipsum Dolor by Foo Barbaz</div>
              <div>Lorem Ipsum Dolor by Foo Barbaz</div>
              <div>Lorem Ipsum Dolor by Foo Barbaz</div>
              <div>Lorem Ipsum Dolor by Foo Barbaz</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OneView
