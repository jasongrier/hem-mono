import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function Home(): ReactElement {
  return (
    <div className="page page--home">
      {/* TODO: Header/Footer components */}
      {/* TODO: Helmet here */}
      <header>
        <h1>HEM Studio</h1>
      </header>

      <p>Space for utilities, prototyping, live coding, etc.</p>
      <p>Note: Though this project is set up as a website, most of these tools require you to work locally.</p>
      <p>Browse the MVP's and demos to see what stuff can be done.</p>
      {/* TODO: Create a separate public Github repo as a submodule */}
      {/* TODO: Link to Github repo */}
      <p>Fork the git repo to get going.</p>

      <h2>Demos</h2>
      <nav>
        <ul>
          <li><Link to="/demos/arpeggiator">Arpeggiator</Link></li>
          <li><Link to="/demos/arranger">Arranger</Link></li>
          <li><Link to="/demos/clock-divider">Clock Divider</Link></li>
          <li><Link to="/demos/flip-book">Flip Book</Link></li>
          <li><Link to="/demos/midi">MIDI</Link></li>
        </ul>
      </nav>

      <h2>Projects</h2>
      <p>
        Link your projects here
      </p>

      <h2>Docs</h2>
      <nav>
        <ul>
          <li><Link to="/docs/live-coding-animation">Live Coding for Animation/Video</Link></li>
          <li><Link to="/docs/live-coding-sound">Live Coding for Sound</Link></li>
          <li><Link to="/docs/arrangement">Podcast/Audiobook arrangement</Link></li>
          <li><Link to="/docs/utilities">Utilities, such as moving, renaming trimming files</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
