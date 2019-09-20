import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import Board from './Board'
import Palette from './Palette'
import { toggleDrawer } from '../store/actions' // TODO: Barrelise actions
import { useClock } from '../hooks'
import { flashDot } from '../helpers'
import { CursorGroup } from '../store/types'

let activeNotes: number[] = []

function App(): ReactElement {
  const { dots } = useSelector((state: RootState) => ({
    dots: state.app.boards[state.app.currentBoard].dots,
  }))

  useEffect(() => {
    activeNotes = dots.reduce((acc: number[], on: CursorGroup, index: number) => {
      if (on) {
        acc.push(index)
      }
      return acc
    }, [])
  }, [activeNotes])

  useClock('web', () => {
    const noteToSend = activeNotes.length ?
      activeNotes[Math.round(Math.random() * (activeNotes.length - 1))]
      : null

    if (noteToSend) {
      flashDot(noteToSend)
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
