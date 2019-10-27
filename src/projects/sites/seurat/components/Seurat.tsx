import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import Canvas from './Canvas'
import Palette from './Palette'
import { useClock } from '../hooks'
import { DO_OPENING_SEQUENCE, WITH_DIVOT } from '../config'
import { dotNumberToNote, flashDots } from '../functions/canvas'
import { setupBuiltInSounds } from '../functions/sounds'
import { pickNoteRandom } from '../functions/performance'
import { IDot } from '../store/types'
import { playOpeningSequence, setMasterVolume } from '../store/actions'
import DeviceControls from './DeviceControls'
import IconButton from './IconButton'
import { noop } from 'lodash'
import Dial from './Dial'
import InstrumentLogo from './InstrumentLogo'

// const samplers: any = setupBuiltInSounds()

interface IActiveDot extends IDot {
  index: number
}

interface IActiveDots {
  a: IActiveDot[]
  b: IActiveDot[]
  c: IActiveDot[]
}

let activeNotesProxy: IActiveDots
let playingProxy: boolean // TODO: How to prevent values getting frozen into a hook??

function Seurat(): ReactElement {
  const { dots, playing, on } = useSelector((state: RootState) => ({
    dots: state.app.canvases[state.app.currentCanvasIndex].dots,
    playing: state.app.playing,
    on: state.app.on,
  }))

  const dispatch = useDispatch()

  if (DO_OPENING_SEQUENCE) {
    useEffect(() => {
      dispatch(playOpeningSequence())
    }, [])
  }

  useEffect(() => {
    activeNotesProxy = dots.reduce((acc: any, { cursorGroup, sound }: IDot, index: number) => {
      if (cursorGroup !== 'none') {
        acc[cursorGroup].push({ index, sound })
      }
      return acc
    }, {
      a: [],
      b: [],
      c: [],
    })
  }, [dots])

  useEffect(() => { playingProxy = playing }, [playing])

  useClock('web', () => {
    // const noteA = pickNoteRandom(activeNotesProxy.a)
    // const noteB = pickNoteRandom(activeNotesProxy.b)
    // const noteC = pickNoteRandom(activeNotesProxy.c)

    // const dotsToTrigger: IActiveDot[] = []

    // if (null !== noteA) {
    //   dotsToTrigger.push(noteA.note)
    // }

    // if (null !== noteB) {
    //   dotsToTrigger.push(noteB.note)
    // }

    // if (null !== noteC) {
    //   dotsToTrigger.push(noteC.note)
    // }

    // if (dotsToTrigger.length && playingProxy) {
    //   const dotNumbers = dotsToTrigger.map(dot => dot.index)
    //   flashDots(dotNumbers)
    //   samplers[sound].play(dotNumbers.map(dotNumberToNote)) // TODO: Play the sound assigned to the dot, not the canvas' sound
    // }
  })

  return (
    <div className={`
      seurat
        ${WITH_DIVOT ? 'seurat--with-divot' : ''}
        seurat--device-${on ? 'on' : 'off'}
    `}>
      <Palette />
      <Canvas />
      <DeviceControls />
    </div>
  )
}

export default Seurat
