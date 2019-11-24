import React, { ReactElement } from 'react'
import UseAnIdeWarning from '../components/UseAnIdeWarning'

function Arrangement(): ReactElement {
  return (
    <div className="page page--arrangement">
      <h2>Sound Composition</h2>
      <p>Slice and arrange audio clips into an old-fashioned text outline</p>
      <p>Annotate clips with text, translations, images, fader automations, etc</p>
      <p>Export the whole thing to an Ableton Live file</p>

      <UseAnIdeWarning />

      <h3>Components</h3>

      <section className="component-doc">
        <h4>Sound</h4>
        <p>tbd</p>
        <h5>Options</h5>
        <ul>
          <li>tbd</li>
        </ul>
      </section>

      <section className="component-doc">
        <h4>SoundBank</h4>
        <p>tbd</p>
        <h5>Options</h5>
        <ul>
          <li>tbd</li>
        </ul>
      </section>

      <section className="component-doc">
        <h4>Sequencer</h4>
        <p>tbd</p>
        <h5>Options</h5>
        <ul>
          <li>type</li>
          <li>sequenceFunction</li>
        </ul>
      </section>

      <section className="component-doc">
        <h4>Mixer</h4>
        <p>tbd</p>
        <h5>Options</h5>
        <ul>
          <li>type</li>
          <li>sequenceFunction</li>
        </ul>
      </section>
    </div>
  )
}

export default Arrangement
