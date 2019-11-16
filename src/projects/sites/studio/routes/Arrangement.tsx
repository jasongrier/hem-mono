import React, { ReactElement } from 'react'
import UseAnIdeWarning from '../components/UseAnIdeWarning'

function Arrangement(): ReactElement {
  return (
    <div className="page page--arrangement">
      <h2>Sound Arrangement</h2>
      <p>Slice and arrange audio clips into an old-fashioned text outline</p>
      <p>Annotate clips with text, translations, images, fader automations, etc</p>
      <p>Export the whole thing to an Ableton Live file</p>

      <UseAnIdeWarning />

      <h3>Components</h3>

      <section className="component-doc">
        <h4>ClipSource</h4>
        <p>Uses a similar "Source–File > Clip" metaphor from a DAW</p>
        <h5>Options</h5>
        <ul>
          <li>src</li>
          <li>start</li>
          <li>loop</li>
          <li>end</li>
          <li>name</li>
          <li>description</li>
          <li>transcription</li>
          <li>tags</li>
          <li>automations</li>
          <li>fades</li>
        </ul>
      </section>

      <section className="component-doc">
        <h4>Clip</h4>
        <p>Wraps ClipSource for use in Section</p>
        <h5>Options</h5>
        <ul>
          <li>name</li>
          <li>startPos</li>
        </ul>
      </section>

      <section className="component-doc">
        <h4>Section</h4>
        <p>Groups other Section's and Clip's as React children</p>
        <h5>Options</h5>
        <ul>
          <li>title</li>
          <li>description</li>
          <li>transcriptions</li>
        </ul>
      </section>
    </div>
  )
}

export default Arrangement
