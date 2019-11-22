import React, { ReactElement, useEffect } from 'react'
import WebMidi from 'webmidi'

function Midi(): ReactElement {
  useEffect(() => { // TODO: useMidi hook // TODO: Navigate away, then back, beeps don't start again
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

      clock = window.setInterval(() => {
        output.playNote('A3')
        setTimeout(() => {
          output.stopNote('A3')
        }, 100)
      }, 500)
    })

    return function cleanup() { // TODO: Replace all `return function destroy` with `return function cleanup`
      input.removeListener('noteon')
      clearInterval(clock)
    }
  }, [])

  return (
    <div className='page page--demo-midi'>
      MIDI Test
    </div>
  )
}

export default Midi
