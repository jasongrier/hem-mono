import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import WebMidi from 'webmidi'
import { BASE_SITE_PAGE_TITLE } from '../../config'
import { flashLight } from '../../functions'

let clock: number
let output: any

// TODO: Move to the new Midi class
WebMidi.enable(function (err) {
  if (err) {
    alert('WebMidi could not be enabled')
    console.log('WebMidi could not be enabled', err)
    return
  }

  output = WebMidi.getOutputByName('HEM MIDI Tunnel')

  if (!output) {
    alert('WebMidi could not be enabled')
  }
})

function startDemo() {
  if (!output) return

  // TODO: Use the new Counter class
  clock = window.setInterval(() => {
    output.playNote('A3')
    flashLight('midi-demo-light')
    setTimeout(() => {
      output.stopNote('A3')
    }, 100)
  }, 500)
}

function stopDemo() {
  clearInterval(clock)
}

function MidiDemo(): ReactElement {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    return function cleanup() {
      stopDemo()
    }
  }, [])

  function toggleDemo() {
    if (started) {
      stopDemo()
    }

    else {
      startDemo()
    }

    setStarted(!started)
  }

  return (
    <main className="page midi-demo">
      <Helmet>
        <title>{ BASE_SITE_PAGE_TITLE } MIDI Demo</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>MIDI Demo</h1>
      <p>Send MIDI to and from a sequencer</p>

      <h2>Instructions</h2>
      <ul>
        <li>Select "HEM MIDI Cord" in your DAW</li>
        <li>Click START</li>
        <li>The output light below should flash</li>
        <li>A synth in your DAW should play</li>
        <li>Note: MIDI timing can be <i>way</i> off if you use other apps in full screen mode</li>
      </ul>

      <p>
        <button onClick={toggleDemo}>
          { started ? 'STOP' : 'START' }
        </button>
      </p>

      <p>
        OUT:
        <span
          className="studio-demo-light"
          id="midi-demo-light"
        />
      </p>
    </main>
  )
}

export default MidiDemo
