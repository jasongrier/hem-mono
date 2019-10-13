import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ClockDivider } from '../../../../common/classes'
import { RootState } from '../store'
import Canvas from './Canvas'
import Palette from './Palette'
import ControlPanel from './ControlPanel'
import { useClock } from '../hooks'
import { flashDots, webVersionSamplers } from '../functions'
import { CursorGroup, WebVersionPreset } from '../store/types'

const samplers = webVersionSamplers()

interface IActiveNotes {
  white: number[]
  red: number[]
  yellow: number[]
  blue: number[]
}

let activeNotes: IActiveNotes
let proxyOn: boolean // TODO: How to prevent values getting frozen into a hook??
let webVersionBoardPresetProxy: WebVersionPreset

export const colorClockDividers = [
  new ClockDivider({
    name: 'foo',
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

function pickNote(activeNotesInColor: number[]) {
  return activeNotesInColor.length ?
    activeNotesInColor[Math.round(Math.random() * (activeNotesInColor.length - 1))]
      : null
}

function App(): ReactElement {
  const { dots, on, webVersionBoardPreset } = useSelector((state: RootState) => ({
    dots: state.app.canvases[state.app.currentBoard].dots,
    on: state.app.on,
    webVersionBoardPreset: state.app.webVersionBoardPreset,
  }))

  useEffect(() => {
    activeNotes = dots.reduce((acc: any, color: CursorGroup, index: number) => {
      if (color !== 'empty') {
        acc[color].push(index)
      }
      return acc
    }, {
      white: [],
      red: [],
      yellow: [],
      blue: [],
    })
  }, [dots, webVersionBoardPreset])

  useEffect(() => {
    proxyOn = on
    webVersionBoardPresetProxy = webVersionBoardPreset
  }, [on, webVersionBoardPreset])

  useClock('web', () => {
    const whiteNote = pickNote(activeNotes.white)
    const redNote = pickNote(activeNotes.red)
    const yellowNote = pickNote(activeNotes.yellow)
    const blueNote = pickNote(activeNotes.blue)

    const notesToFlash: number[] = []

    if (null !== whiteNote) {
      colorClockDividers[0].onTick(() => {
        notesToFlash.push(whiteNote)
      })
    }

    if (null !== redNote) {
      colorClockDividers[1].onTick(() => {
        notesToFlash.push(redNote)
      })
    }

    if (null !== yellowNote) {
      colorClockDividers[2].onTick(() => {
        notesToFlash.push(yellowNote)
      })
    }

    if (null !== blueNote) {
      colorClockDividers[3].onTick(() => {
        notesToFlash.push(blueNote)
      })
    }

    if (notesToFlash.length && proxyOn) {
      flashDots(notesToFlash)

      samplers[webVersionBoardPresetProxy].triggerAttack('C4')

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
