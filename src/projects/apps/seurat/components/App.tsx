import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Board from './Board'
import Palette from './Palette'
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

function pickNote(activeNotesInColor: number[]) {
  return activeNotesInColor.length ?
    activeNotesInColor[Math.round(Math.random() * (activeNotesInColor.length - 1))]
      : null
}

function App(): ReactElement {
  const { dots } = useSelector((state: RootState) => ({
    dots: state.app.boards[state.app.currentBoard].dots,
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

    const notesToSend: number[] = []

    if (null !== whiteNote) notesToSend.push(whiteNote)
    if (null !== redNote) notesToSend.push(redNote)
    if (null !== yellowNote) notesToSend.push(yellowNote)
    if (null !== blueNote) notesToSend.push(blueNote)

    if (notesToSend.length) {
      flashDots(notesToSend)
    }
  })

  return (
    <div className='hem-application'>
      <Palette />
      <Board />
    </div>
  )
}

export default App
