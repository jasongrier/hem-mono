import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function DemosNav(): ReactElement {
  return (
    <nav className="demos-nav">
      <ul>
        <li>
          <Link to="/demos/arpeggiator">Arpeggiator</Link>
        </li>
        <li>
          <Link to="/demos/arranger">Arranger</Link>
        </li>
        <li>
          <Link to="/demos/metronome">Metronome</Link>
        </li>
        <li>
          <Link to="/demos/flip-book">Flip Book</Link>
        </li>
        <li>
          <Link to="/demos/noise-reduction">Noise Reduction</Link>
        </li>
        <li>
          <Link to="/demos/midi">MIDI</Link>
        </li>
        <li>
          <Link to="/demos/performer-demo">Performer</Link>
        </li>
      </ul>
    </nav>
  )
}

export default DemosNav
