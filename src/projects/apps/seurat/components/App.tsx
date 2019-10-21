import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Canvas from './Canvas'
import Palette from './Palette'
import ControlPanel from './ControlPanel'
import { useClock } from '../hooks'
import { dotNumberToNote, flashDots } from '../functions/canvas'
import { setupBuiltInSounds } from '../functions/sounds'
import { pickNoteRandom } from '../functions/performance'
import { IDot } from '../store/types'

const samplers: any = setupBuiltInSounds()

interface IActiveDot extends IDot {
  index: number
}

interface IActiveDots {
  blue: IActiveDot[]
  red: IActiveDot[]
  white: IActiveDot[]
  yellow: IActiveDot[]
}

let activeNotesProxy: IActiveDots
let onProxy: boolean // TODO: How to prevent values getting frozen into a hook??

function App(): ReactElement {
  const { dots, on, sound } = useSelector((state: RootState) => ({
    dots: state.app.canvases[state.app.currentCanvas].dots,
    on: state.app.on,
    sound: state.app.canvases[state.app.currentCanvas].defaultSound,
  }))

  useEffect(() => {
    activeNotesProxy = dots.reduce((acc: any, { cursorGroup, sound }: IDot, index: number) => {
      if (cursorGroup !== 'empty') {
        acc[cursorGroup].push({ index, sound })
      }
      return acc
    }, {
      white: [],
      red: [],
      yellow: [],
      blue: [],
    })
  }, [dots])

  useEffect(() => { onProxy = on }, [on])

  useClock('web', () => {
    const blueNote = pickNoteRandom(activeNotesProxy.blue)
    const redNote = pickNoteRandom(activeNotesProxy.red)
    const whiteNote = pickNoteRandom(activeNotesProxy.white)
    const yellowNote = pickNoteRandom(activeNotesProxy.yellow)

    const dotsToTrigger: IActiveDot[] = []

    if (null !== whiteNote) {
      dotsToTrigger.push(whiteNote.note)
    }

    if (null !== redNote) {
      dotsToTrigger.push(redNote.note)
    }

    if (null !== yellowNote) {
      dotsToTrigger.push(yellowNote.note)
    }

    if (null !== blueNote) {
      dotsToTrigger.push(blueNote.note)
    }

    if (dotsToTrigger.length && onProxy) {
      const dotNumbers = dotsToTrigger.map(dot => dot.index)
      flashDots(dotNumbers)
      samplers[sound].play(dotNumbers.map(dotNumberToNote)) // TODO: Play the sound assigned to the dot, not the canvas' sound
    }
  })

  return (
    <div className="hem-application">
      <Palette />
      <Canvas />
      <ControlPanel />
    </div>
  )
}

export default App
