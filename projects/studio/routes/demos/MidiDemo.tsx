import React, { ReactElement, useEffect, useState } from 'react'
import WebMidi from 'webmidi'

function MidiDemo(): ReactElement {
  const [started, setStarted] = useState(false)

  // TODO: Midi class
  useEffect(() => {
    let input: any
    let output: any
    let clock: number

    WebMidi.enable(function (err) {
      if (err) {
        console.log('WebMidi could not be enabled.', err)
        return
      }

      input = WebMidi.getInputByName('HEM MIDI Tunnel: A')
      output = WebMidi.getOutputByName('HEM MIDI Tunnel: D')

      input.addListener('noteon', 'all',
        function (evt: any) {
          console.log(evt.note.name, evt.note.octave)
        }
      )

      // TODO: Use ClockDivider
      clock = window.setInterval(() => {
        output.playNote('A3')
        setTimeout(() => {
          output.stopNote('A3')
        }, 100)
      }, 500)
    })

    return function cleanup() {
      input.removeListener('noteon')
      clearInterval(clock)
    }
  }, [])

  return (
    <div className='page midi-demo'>
      <h1>MIDI MVP</h1>
      <p>Send MIDI to and from a sequencer</p>
      <p>Requires Google Chrome and Ableton Live</p>
      <h2>Instructions</h2>
      <ul>
        {/* TODO: What test file? Where? (/resources) */}
        <li>Launch the test file in Ableton Live</li>
        {/* TODO: Screenshot and better description */}
        <li>Configure MIDI preferences</li>
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
          className="studio__demo-light"
          id="midi-demo-light-in"
        />
      </p>
      <p>
        OUT:
        <span
          className="studio__demo-light"
          id="midi-demo-light-out"
        />
      </p>
    </div>
  )
}

export default MidiDemo
