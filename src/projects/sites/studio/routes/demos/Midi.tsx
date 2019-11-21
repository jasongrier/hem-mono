import React, { ReactElement, useEffect } from 'react'
import WebMidi from 'webmidi'

WebMidi.enable()

function Midi(): ReactElement {
  useEffect(() => {
    const input: any = WebMidi.getInputByName('HEM MIDI Tunnel: DAW -> HEM')
    const output = WebMidi.getOutputByName('HEM MIDI Tunnel: HEM -> DAW')
    input.addListener('noteon', "all",
      function (e: any) {
        console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      }
    )
  }, [])

  return (
    <div className="page page--demo-midi">
      MIDI Test
    </div>
  )
}

export default Midi
