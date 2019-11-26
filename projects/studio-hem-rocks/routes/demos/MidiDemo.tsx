import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import WebMidi from 'webmidi'
import { BASE_SITE_PAGE_TITLE } from '../../config'

function MidiDemo(): ReactElement {
  const [started, setStarted] = useState(false)

  // TODO: Midi class
  useEffect(() => {
    let input: any
    let output: any
    let clock: number

    WebMidi.enable(function (err) {
      if (err) {
        alert('WebMidi could not be enabled')
        console.log('WebMidi could not be enabled', err)
        return
      }

      input = WebMidi.getInputByName('HEM MIDI Tunnel: A')
      output = WebMidi.getOutputByName('HEM MIDI Tunnel: D')

      try {
        input.addListener('noteon', 'all',
          function (evt: any) {
            console.log(evt.note.name, evt.note.octave)
          }
        )
      }

      catch(err) {
        alert('MIDI communication could not be set up')
        console.log('MIDI communication could not be set up', err)
        return
      }

      // TODO: Use ClockDivider
      clock = window.setInterval(() => {
        output.playNote('A3')
        setTimeout(() => {
          output.stopNote('A3')
        }, 100)
      }, 500)
    })

    return function cleanup() {
      input && input.removeListener('noteon')
      clearInterval(clock)
    }
  }, [])

  return (
    <main className='page midi-demo'>
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} MIDI Demo</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>MIDI Demo</h1>
      <p>Send MIDI to and from a sequencer</p>

      <h2>Instructions</h2>
      <ul>
        <li>Start the MIDI Tunnel</li>
        {/* TODO: Screenshot of how to do this in Ableton Live */}
        <li>Set up something like this in your DAW</li>
        {/* TODO: Screenshot and better description */}
        <li>Configure MIDI preferences like this</li>
        <li>Click start</li>
        <li>Click play in Ableton Live</li>
        <li>The input and output lights below should flash</li>
        <li>The synth in Ableton Live should beep to the output light</li>
      </ul>
      <p>
        {started ? 'STOP' : 'START'}
      </p>
      <p>
        IN:
        <span
          className="studio-demo-light"
          id="midi-demo-light-in"
        />
      </p>
      <p>
        OUT:
        <span
          className="studio-demo-light"
          id="midi-demo-light-out"
        />
      </p>
    </main>
  )
}

export default MidiDemo
