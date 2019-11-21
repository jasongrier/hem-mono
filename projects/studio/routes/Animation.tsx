import React, { ReactElement } from 'react'
import UseAnIdeWarning from '../components/UseAnIdeWarning'

function Animation(): ReactElement {
  return (
    <div className="page page--animation">
      <h2>Animation</h2>
      <p>Simple "flip book" style animations sequenced from folders of JPEG images</p>

      <UseAnIdeWarning />

      <h3>Components</h3>

      <section className="component-doc">
        <h4>FlipBook</h4>
        <p>Algebraic image sequencer. Default form is just showing images one after another, like a conventional flip book. Can be provided any old function to sequence frames however. Some built-in effects. Can be passed a style function for custom effects</p>
        <h5>Options</h5>
        <ul>
          <li>sequenceType</li>
          <li>frameRate</li>
          <li>sequenceFunction</li>
          <li>frameRateFunction</li>
          <li>styleFunction</li>
        </ul>
      </section>

      <section className="component-doc">
        <h4>Levenshtein</h4>
        <p>Random image sequencer, picks frames by Levenshtein distance, to a given reliability. Wraps FlipBook</p>
        <h5>Options</h5>
        <ul>
          <li>reliability</li>
        </ul>
      </section>

      <section className="component-doc">
        <h4>Trainer</h4>
        <p>Trains a neural network on an image sequence, then tries to render a new image sequence. Wraps FlipBook</p>
        <h5>Options</h5>
        <ul>
          <li>type</li>
          <li>gradientFunction</li>
          <li>backPropagate</li>
        </ul>
      </section>
    </div>
  )
}

export default Animation
