import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ClockDivider } from '../../../../common/classes'
import { RootState } from '../store'
import Board from './Board'
import Palette from './Palette'
import SoundPicker from './SoundPicker'
import { useClock } from '../hooks'
import { flashDots } from '../helpers'
import { CursorGroup } from '../store/types'

interface IActiveNotes {
  white: number[]
  red: number[]
  yellow: number[]
  blue: number[]
}

let activeNotes: IActiveNotes

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
  const { dots, params } = useSelector((state: RootState) => ({
    dots: state.app.boards[state.app.currentBoard].dots,
    params: state.app.params,
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
  }, [dots])

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

    if (notesToFlash.length) {
      flashDots(notesToFlash)
    }
  })

  return (
    <div className="hem-application">
      {/* <Settings /> */}
      <Palette />
      <Board />
      <SoundPicker />
    </div>
  )
}

export default App
