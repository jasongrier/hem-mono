import React, { ReactElement, useEffect } from 'react'
import $ from 'jquery'

function TheApp(): ReactElement {
  useEffect(() => {
    // setTimeout(() => {
      $('video').prop('volume', 0)
    // }, 100)
  }, [])

  return (
    <div className="app-page">
      <section className="heroine heroine--normal center">
        <p>
          Our custom-built word processor privately captures the writing process, <br />
          allowing you to generate timelapses and replay what you've written.<br />
          Documents are saved with a .midst extension (instead of .doc, .rtf, .txt, etc.). <br />
          The Midst app is the engine that lets the journal run. It currently runs on any Mac computer. <br /><br />
          We're currenty looking for beta testers!<br />
          Poets interesting in participating in the Midst pilot issue: <br />
          contact Annelyse at midsthq@gmail.com (subject line BETA).
        </p>
        <video width="500px" style={{border: '5px solid'}} controls loop>
          <source src="http://data.midst.press/Wheelbarrow.m4v" type="video/mp4" />
        </video>
      </section>
    </div>
  )
}

export default TheApp
