import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function Home(): ReactElement {
  return (
    <div className="page page--home">
      <h2>Table of Contents</h2>
      <p>Space for utilities, prototyping, live coding, etc.</p>
      <p>Note: Though this project is set up as a website, most of these tools require you to work locally. Browse the demos to see what stuff can be done. Clone the git repo to get doing.</p>

      <nav>
        <Link to="/live-coding-animation">Live Coding for Animation/Video</Link>
        <Link to="/live-coding-sound">Live Coding for Sound</Link>
        <Link to="/arrangement">Podcast/Audiobook arrangement</Link>
        <Link to="/utilities">Utilities, such as moving, renaming trimming files</Link>
      </nav>
    </div>
  )
}

export default Home
