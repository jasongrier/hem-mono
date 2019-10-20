import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ClockDivider } from '../../../../common/classes'
import { RootState } from '../store'
import Canvas from './Canvas'
import Palette from './Palette'
import ControlPanel from './ControlPanel'
import { useClock } from '../hooks'
import { flashDots } from '../functions/canvas'
import { setupBuiltInSounds } from '../functions/sounds'
import { IDot } from '../store/types'

const samplers = setupBuiltInSounds()

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

export const colorClockDividers = [
  new ClockDivider({
    ticksPerBeat: 2,
  }),

  new ClockDivider({
    ticksPerBeat: 2,
  }),

  new ClockDivider({
    ticksPerBeat: 2,
  }),

  new ClockDivider({
    ticksPerBeat: 2,
  }),
]

function pickNote(activeNotesInColor: IActiveDot[]) {
  return activeNotesInColor.length ?
    activeNotesInColor[Math.round(Math.random() * (activeNotesInColor.length - 1))]
      : null
}

function App(): ReactElement {
  const { canvasName, dots, on } = useSelector((state: RootState) => ({
    canvasName: state.app.canvases[state.app.currentCanvas].name,
    dots: state.app.canvases[state.app.currentCanvas].dots,
    on: state.app.on,
  }))

  useEffect(() => {
    activeNotesProxy = dots.reduce((acc: any, { cursorGroup, sound }: IDot, index: number) => {
      if (cursorGroup !== 'empty') {
        console.log(cursorGroup)
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
    const blueNote = pickNote(activeNotesProxy.blue)
    const redNote = pickNote(activeNotesProxy.red)
    const whiteNote = pickNote(activeNotesProxy.white)
    const yellowNote = pickNote(activeNotesProxy.yellow)

    const notesToFlash: number[] = []

    if (null !== whiteNote) {
      colorClockDividers[0].onTick(() => {
        notesToFlash.push(whiteNote.index)
      })
    }

    if (null !== redNote) {
      colorClockDividers[1].onTick(() => {
        notesToFlash.push(redNote.index)
      })
    }

    if (null !== yellowNote) {
      colorClockDividers[2].onTick(() => {
        notesToFlash.push(yellowNote.index)
      })
    }

    if (null !== blueNote) {
      colorClockDividers[3].onTick(() => {
        notesToFlash.push(blueNote.index)
      })
    }

    if (notesToFlash.length && onProxy) {
      flashDots(notesToFlash)
      samplers[canvasName].play('C1')
      // samplers[webVersionBoardPresetProxy].play(dotIndicesToWesternNotes(notesToFlash))
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
